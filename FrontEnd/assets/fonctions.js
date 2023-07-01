export function genererProjets(projets) {
    // Efface le contenu de la balise gallery et donc les projets
    document.querySelector(".gallery").innerHTML = " ";
    for (let i = 0; i < projets.length; i++) {
        const gallery = document.querySelector(".gallery")
        const figure = document.createElement("figure")
        gallery.appendChild(figure)
        const photo = document.createElement("img")
        photo.src = projets[i].imageUrl
        figure.appendChild(photo)
        const figCaption = document.createElement("figcaption")
        figCaption.innerText = projets[i].title
        figure.appendChild(figCaption)

    }
}

export function genererProjetsModal (projets){
    /* Efface le contenu de la balise gallery et donc les projets
     pour les reafficher correctement en cas de suppression de l'un d'eux*/
     const galleryModal = document.querySelector(".gallery-modal")
     galleryModal.innerHTML = "";
    for (let i = 0; i < projets.length; i++) {
        const figure = document.createElement("figure")
        //on affiche licone dans l image
        figure.innerHTML = '<div class="thrash"><i class="fa-solid fa-trash-can"></i></div>'
        galleryModal.appendChild(figure)
        const photo = document.createElement("img")
        photo.src = projets[i].imageUrl
        console.log(projets[i].imageUrl)
        figure.appendChild(photo)
        const figCaption = document.createElement("figcaption")
        figure.appendChild(figCaption)
        figCaption.innerText = "éditer"

    }

}