
let target = null

const openModal = function (e) {
    e.preventDefault();
    target = document.querySelector(e.target.getAttribute('href'));
    console.log(target);
    //affichage de la modale avec visibility; visible!important dans le css
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
     //reaffichage EVENTUEL du champ d'upload et effacement eventuel des vignettes de la deuxieme modale
     const imagePreviewErase = document.querySelector('#image-preview');
     console.log(imagePreviewErase);
     if (imagePreviewErase !== null){
     imagePreviewErase.remove();}
     document.getElementById('image-input').classList.remove('hide-modal-elements');
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
//Au lieu d ouvrir uen nouvelel modale on reste dan sla meme mais on change le DOM depuis le JS
const changeModal = function (e) {
    e.preventDefault();
    console.log("bouton bien cliquer");
    document.querySelector('.gallery-modal').classList.add("hide-modal-elements");
    document.querySelector('.js-remove-gallery').classList.add("hide-modal-elements");
    document.querySelector('#js-modal-title').innerText = "Ajout photo";
    //on cache evidemment le bouton qui a servi a lancer cette nouvelle modale
    document.querySelector('.js-add-project').classList.add("hide-modal-elements");
    //on cache  le HR qui est pas au bon encroit
    document.querySelector('.js-line').classList.add("hide-modal-elements");
    //on display le formulaire
    document.querySelector('#new-project-form').classList.remove("hide-modal-elements");
}
const stopPropagation = function(e) {
    e.stopPropagation()
}

//On selectionne tous les liens avec la classe js-modal et on leur fait appeler la fonction openModal au click
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

//on va cherche le bouton ajouter projet et on lui fait changer la modale
document.querySelector('.js-add-project').addEventListener('click',changeModal);

//sortie de la modale avec la touche esc

window.addEventListener('keydown', function(e) {
    if (e.key === "Escape" || e.key ==="Esc")
    closeModal(e);

});
