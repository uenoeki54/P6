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

imageInput.addEventListener('change', function(){
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


//ON ESSAYE D U PLOADER UN NOIVEAU PROJET AU CLICK SUR LE BOUTON
uploadForm.addEventListener('submit', (e) =>{
e.preventDefault();
console.log('vous avez cliqued pour soumettre le formulaire');
let uploadPicture = picture.files[0];
let uploadTitle = title.value;
let uploadCategory = category.value;
const formData = new FormData();    
formData.append('image', uploadPicture)
formData.append('title', uploadTitle)
formData.append('category', uploadCategory)
//acces au token stocké dans localstorage lors du login 

uploadProject(formData)
.then ((response) => response.json())
.then(valider => {
    if (valider) {
        console.log("ok")
    } else {
        console.log("error")
    }
    }
)


});



