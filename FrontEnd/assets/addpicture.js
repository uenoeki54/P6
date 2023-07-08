/*
function selectImage(afterSelection) {
    const inputFile = document.getElementById('input-file');
    inputFile.addEventListener('change', function () {
        if (afterSelection) {

            afterSelection(inputFile);
        }
    });
    return inputFile;
}

document.getElementById("new-project-form").appendChild(
    selectImage(function (inputFile) {
        var reader = new FileReader();
        reader.readAsDataURL(inputFile.files[0]);
        console.log("Done");
    })
);*/

const imageInput = document.getElementById('image-input');
//variable globale
var uploadedImage = "";

imageInput.addEventListener('change', function () {
    var reader = new FileReader();
    reader.addEventListener('load', () => {
        //on cache le input pour correspondre a la maquette
        imageInput.classList.add('hide-modal-elements');
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
var formData = new FormData();
//DEFINITION DE LA FONCTION D'UPLOAD APRES ON LA DEPLACERA PEUT ETRE 
async function uploadProject(formData) {
    return fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData,
    })
}


// fonction pour tester les CHAMPS

function testChamps() {
    let uploadPicture = picture.files[0];
    let uploadTitle = title.value;
    console.log('valeur de l image' + uploadPicture);
    console.log('valeur du titre' + uploadTitle);
    if (uploadPicture !== undefined && uploadTitle !== "") {
        uploadButton.classList.remove("add-project-button-inactive");
    }
    else {
        uploadButton.classList.add("add-project-button-inactive");
    }
}
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
        .then((response) => response.json())
        .then(payload => {
            if (payload) {
                console.log("projet envoyé")
                //AJOUT DE LA NOUVELLE IMAGE DANS LE PORTFOLIO SANS RAFRAICHISSEMENT
                const newFigure = document.createElement("figure");
                const newPic = document.createElement("img");
                //c est dans payload qu on va retrouver tous les attributs de notre peojets, a reintegrer dans le DOM
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
                // effacement  des vignettes de la deuxieme modale et reaffichage du champ d'upload 
                const imagePreviewErase = document.querySelector('#image-preview');
                console.log(imagePreviewErase);
                if (imagePreviewErase !== null) {
                    imagePreviewErase.remove();
                }
                document.getElementById('image-input').classList.remove('hide-modal-elements');
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

                //on vide les champs dans le formulaire
                document.getElementById("image-input").value = "";
                document.getElementById("title").value = ""
                

            } else {
                console.log("error")
            }
        }
        )
};
//ON ESSAYE D U PLOADER UN NOUVEAU PROJET AU CLICK SUR LE BOUTON

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('vous avez cliqued pour soumettre le formulaire');
    uploadTry();
});





