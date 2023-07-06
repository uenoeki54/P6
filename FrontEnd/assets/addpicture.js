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
        uploadedImage = reader.result;
        document.getElementById('display-image').style.backgroundImage = `url(${uploadedImage})`;
    });
    reader.readAsDataURL(this.files[0]);
}
)

