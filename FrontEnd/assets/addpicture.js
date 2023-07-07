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

