
let target = null

const openModal = function (e) {
    e.preventDefault();
    target = document.querySelector(e.target.getAttribute('href'));
    console.log(target);
    //affichage de la modale avec visibility; visible!important dans le css
    target.classList.remove("modal-closed");
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

const stopPropagation = function(e) {
    e.stopPropagation()
}

//On selectionne tous les liens avec la classe js-modal et on leur fait appeler la fonction openModal au click
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

//sortie de la modale avec la touche esc

window.addEventListener('keydown', function(e) {
    if (e.key === "Escape" || e.key ==="Esc")
    closeModal(e);

})
