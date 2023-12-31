
let target = null

const openModal = function (e) {
    e.preventDefault();
    //on efface le message de succes eventuel d ajout d image
    const uploadMessage = document.getElementById("upload-message");
    uploadMessage.innerText = "";
    //...
    target = document.querySelector(e.target.getAttribute('href'));
    //AFFICHAGE DE LA MODALE
    target.classList.remove("modal-closed");
    //affichage du titre 
    document.querySelector('#js-modal-title').innerText = "Galerie photo";
    //reaffichage eventuel de la gallerie au cas ou on aurait utilise la modale ajout projet
    document.querySelector('.gallery-modal').classList.remove("hide-modal-elements");
    //reaffichage eventuel du lien en bas  au cas ou on aurait utilise la modale ajout projet
    document.querySelector('.js-remove-gallery').classList.remove("hide-modal-elements");
     //reaffichage eventuel du bouton qui lance la deuxieme modale
     document.querySelector('.js-add-project').classList.remove("hide-modal-elements");
     //reaffichage eventuel du hr 
     document.querySelector('.js-line').classList.remove("hide-modal-elements");
     //On cache le formulaire d'ajout d image
     document.querySelector('#new-project-form').classList.add("hide-modal-elements");
     //On cache la fleche
     document.querySelector('.js-modal-back').classList.add("hide-modal-elements");
     
    //accessibilité pour ceux qui ont un lecteur d'ecran
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', true);
    //appel fonction pour fermer la modale
    target.addEventListener('click', closeModal)
    document.querySelector('.js-modal-close').addEventListener('click', closeModal)
    document.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)

}
const closeModal = function(e) {
    if (target === null)return;
    e.preventDefault();
    //effacement de la modale avec visibility; visible!important dans le css
    target.classList.add("modal-closed");
    //accessibilité pour ceux qui ont un lecteur d'ecran
    target.setAttribute('aria-hidden', 'true');
    target.removeAttribute('aria-modal');
    target.removeEventListener('click', closeModal)
    target.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    target.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    target = null
    
    
}
//Au lieu d'ouvrir une nouvelle modale on reste dans la meme mais on change le DOM depuis le JS
const changeModal = function (e) {
    e.preventDefault();
    document.querySelector('.gallery-modal').classList.add("hide-modal-elements");
    document.querySelector('.js-remove-gallery').classList.add("hide-modal-elements");
    document.querySelector('#js-modal-title').innerText = "Ajout photo";
    //on cache evidemment le bouton qui a servi a lancer cette nouvelle modale
    document.querySelector('.js-add-project').classList.add("hide-modal-elements");
    //on cache  le HR qui est pas au bon encroit
    document.querySelector('.js-line').classList.add("hide-modal-elements");
    //on display le formulaire
    document.querySelector('#new-project-form').classList.remove("hide-modal-elements");
    //on vide les champs dans le formulaire
    document.getElementById("image-input").value = "";
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    //on enleve l'image preview SI IL Y EN A UNE 
    const thumbnailToClean = document.getElementById("image-preview");
    console.log(thumbnailToClean);
    if (thumbnailToClean !== null) {
    thumbnailToClean.remove();
    }

    //On affiche la fleche
    document.querySelector('.js-modal-back').classList.remove("hide-modal-elements");
    //on remet l icone et le bouton et le texte
    document.getElementById('label-input').classList.remove('hide-modal-elements');
    document.querySelector(".fa-image").classList.remove('hide-modal-elements');
    document.getElementById('image-input-size').classList.remove('hide-modal-elements');
    //on remet eventuellement le bouton en gris et on le desactive
    document.querySelector(".add-project-btn").classList.add("add-project-button-inactive");
    document.querySelector(".add-project-btn").setAttribute('disabled', '');
}

//Code poru repasser de la modale "ajout projet" a la modale "enlever projet"
const backModal = function(e) {
    e.preventDefault();
     //on efface le message de succes eventuel d ajout d image
     const uploadMessage = document.getElementById("upload-message");
     uploadMessage.innerText = "";
      //affichage du titre 
    document.querySelector('#js-modal-title').innerText = "Galerie photo";
    //reaffichage eventuel de la gallerie au cas ou on aurait utilise la modale ajout projet
    document.querySelector('.gallery-modal').classList.remove("hide-modal-elements");
    //reaffichage eventuel du lien en bas  au cas ou on aurait utilise la modale ajout projet
    document.querySelector('.js-remove-gallery').classList.remove("hide-modal-elements");
     //reaffichage eventuel du bouton qui lance la deuxieme modale
     document.querySelector('.js-add-project').classList.remove("hide-modal-elements");
     //reaffichage eventuel du hr 
     document.querySelector('.js-line').classList.remove("hide-modal-elements");
     //On cache le formulaire d'ajout d image
     document.querySelector('#new-project-form').classList.add("hide-modal-elements");
     //On cache la fleche
     document.querySelector('.js-modal-back').classList.add("hide-modal-elements");
}
const stopPropagation = function(e) {
    e.stopPropagation()
}

//On selectionne tous les liens avec la classe js-modal et on leur fait appeler la fonction openModal au click
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

//on reviens vers la premiere modale au click sur la fleche gauche
document.querySelector('.js-modal-back').addEventListener('click',backModal);


//on va cherche le bouton ajouter projet et on lui fait changer la modale
document.querySelector('.js-add-project').addEventListener('click',changeModal);

//sortie de la modale avec la touche esc

window.addEventListener('keydown', function(e) {
    if (e.key === "Escape" || e.key ==="Esc")
    closeModal(e);

});
