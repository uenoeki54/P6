
const uploadMessage = document.getElementById("upload-message");
const labelInput = document.getElementById("label-input");
const imageInput = document.getElementById("image-input");
const iconePaysage = document.querySelector(".fa-image");
const imageInputSize = document.getElementById('image-input-size');
//variable globale
var uploadedImage = "";
// PREVIEW DU THUMBNAIL DE L IMAGE A UPLOADER
imageInput.addEventListener('change', function () {
    var reader = new FileReader();
    reader.addEventListener('load', () => {
        //on cache le input et l icone et le texte pour correspondre a la maquette
        labelInput.classList.add('hide-modal-elements');
        iconePaysage.classList.add('hide-modal-elements');
        imageInputSize.classList.add('hide-modal-elements');
        //on affiche la preview
        const imagePreview = document.createElement('img');
        imagePreview.src = reader.result;
        //on ajoute une classe afin de pouvoir recuperer cette image et l'effacer plus tard
        imageInput.classList.add('js-preview');
        //on la RESIZE via propriete CSS
        imagePreview.id = 'image-preview';
        document.getElementById('display-image').appendChild(imagePreview);

    });
    reader.readAsDataURL(this.files[0]);
}
)
const uploadForm = document.getElementById("new-project-form");
const picture = document.getElementById("image-input");
const title = document.getElementById("title");
const category = document.getElementById("category");
const uploadButton = document.querySelector(".add-project-btn");
//acces au token dans le local storage
const token = localStorage.getItem('Token');



//DEFINITION DE LA FONCTION UPLOAD PROJECT APRES ON LA DEPLACERA PEUT ETRE 
async function uploadProject(formData) {
    return fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData,
    })
}


// FONCTION POUR TESTER LES CHAMPS
function testChamps() {
    uploadMessage.innerText = "";
    const uploadPicture = picture.files[0];
    const uploadTitle = title.value;
    const uploadCategory = category.value;
    //const pictureSize = picture.files[0].size;
    const maxSize = 4 * 1024 * 1024;
    if (picture.files[0] !== undefined) {
        var pictureSize = picture.files[0].size;
    } else { var pictureSize = 0 };

    console.log('valeur de l image: ' + uploadPicture);
    console.log('valeur du titre: ' + uploadTitle);
    console.log('taille de l image: ' + pictureSize);
    console.log('categorie de l image: ' + uploadCategory);
    if (pictureSize > maxSize) {
        uploadMessage.classList.add("error-color");
        uploadMessage.classList.remove("success-color");
        uploadMessage.innerText = "Taille de l'image supérieure a 4 mégas";
        const imagePreviewErase = document.querySelector('#image-preview');
        console.log(imagePreviewErase);
        if (imagePreviewErase !== null) {
            imagePreviewErase.remove();
        }
        document.getElementById('label-input').classList.remove('hide-modal-elements');
        document.querySelector(".fa-image").classList.remove('hide-modal-elements');
        imageInputSize.classList.remove('hide-modal-elements');
    }

    if (uploadPicture !== undefined && uploadTitle !== "" && pictureSize <= maxSize && uploadCategory !== "") {
        uploadButton.classList.remove("add-project-button-inactive");
        uploadButton.removeAttribute('disabled');
        uploadMessage.innerText = "";
    }
    else {
        uploadButton.classList.add("add-project-button-inactive");
        uploadButton.setAttribute('disabled', '');
    }
}

//ADDEVENT LISTENERS POUR TESTER ES CHAMPS DES QUE QUELQUECHOSE BOUGE

title.addEventListener("change", () => {
    testChamps();
})
title.addEventListener("keyup", () => {
    testChamps();
})

title.addEventListener("keydown", () => {
    testChamps();
})
title.addEventListener("focus", () => {
    testChamps();
})

document.getElementById('category').addEventListener("change", () => {
    testChamps();
});

//On declare la fonction d"upload
function uploadTry() {
    let uploadPicture = picture.files[0];
    let uploadTitle = title.value;
    let uploadCategory = category.value;
    const formData = new FormData();
    formData.append('image', uploadPicture)
    formData.append('title', uploadTitle)
    formData.append('category', uploadCategory)
    uploadProject(formData)
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json();
        })
        .then(payload => {
            if (payload) {
                console.log(payload.title)
                console.log(payload.imageURL)
                console.log("projet envoyé")
                //AJOUT DE LA NOUVELLE IMAGE DANS LE PORTFOLIO SANS RAFRAICHISSEMENT
                const newFigure = document.createElement("figure");
                const newPic = document.createElement("img");
                //c est dans payload qu on va retrouver tous les attributs de notre projet, a reintegrer dans le DOM
                newPic.src = payload.imageUrl;
                newFigure.appendChild(newPic);

                //ON REVIENT VERS LE PORTFOLIO CAR IL FAUT AUSSI UN CAPTION
                //on va aussi chercher le titre dans le payload
                const newCaption = document.createElement("figcaption")
                newCaption.innerText = payload.title;
                newFigure.appendChild(newCaption);
                //on rajoute cet element figure parfaitement rempli dans la gallerie
                newFigure.setAttribute('class', 'number' + payload.id);
                document.querySelector(".gallery").appendChild(newFigure);
                //on vide le formulaire 
                // effacement  des vignettes de la deuxieme modale et reaffichage du champ d'upload et icone
                const imagePreviewErase = document.querySelector('#image-preview');
                console.log(imagePreviewErase);
                if (imagePreviewErase !== null) {
                    imagePreviewErase.remove();
                }
                document.getElementById('label-input').classList.remove('hide-modal-elements');
                document.querySelector(".fa-image").classList.remove('hide-modal-elements');
                imageInputSize.classList.remove('hide-modal-elements');
                //AJOUT DE LA NOUVELLE IMAGE DANS LA MODALE 1 SANS RAFRAICHISSEMENT - ON RECOMMENCE LA MEME CHOSE
                const newThumbnail = document.createElement("figure");
                const newMiniPic = document.createElement("img");
                newMiniPic.src = payload.imageUrl;

                //(IL NOUS FAUT AUSSI UN PETIT CAPTION GENERIQUE ET UNE CROIX ID  ETC)
                newThumbnail.innerHTML = '<div class="chaos-star"><i class="fa-solid fa-arrows-up-down-left-right"></i></div><div class="thrash js-thrash"><i class="fa-solid fa-trash-can js-thrash"></i></div>'
                newThumbnail.appendChild(newMiniPic);
                const figCaption = document.createElement("figcaption")
                figCaption.innerText = "éditer";
                newThumbnail.appendChild(figCaption);
                newThumbnail.setAttribute('id', payload.id);
                document.querySelector(".gallery-modal").appendChild(newThumbnail);

                //on vide les champs dans le formulaire et on le desactive
                document.getElementById("image-input").value = "";
                document.getElementById("title").value = ""
                uploadButton.classList.add("add-project-button-inactive");
                document.querySelector(".add-project-btn").setAttribute('disabled', '');
                //MESSAGE DE SUCCES
                uploadMessage.classList.remove("error-color");
                uploadMessage.classList.add("success-color");
                uploadMessage.innerText = "Image uploadée avec succès";
                console.log("succes");
            }
        }).catch(error => {
            const errorCode = error.message;
            if (errorCode === '500' || errorCode === '400') {
                uploadMessage.classList.add("error-color");
                uploadMessage.classList.remove("success-color");
                uploadMessage.innerText = "Erreur lors de l'upload de l'image, veuillez à bien renseigner un titre, à bien selectionner une image valide et à sélectionner une categorie ";
            }
            else if (errorCode === '401') {
                uploadMessage.classList.add("error-color");
                uploadMessage.classList.remove("success-color");
                uploadMessage.innerText = "Accès restreint";
            }
            else {
                uploadMessage.classList.add("error-color");
                uploadMessage.classList.remove("success-color");
                uploadMessage.innerText = "Erreur serveur";
            }
        })


};
//ON ESSAYE D U PLOADER UN NOUVEAU PROJET AU CLICK SUR LE BOUTON

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('vous avez cliqued pour soumettre le formulaire');
    uploadTry();
});
fieldEmail.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        console.log('vous avez cliqued pour soumettre le formulaire');
        uploadTry();
    }
});






