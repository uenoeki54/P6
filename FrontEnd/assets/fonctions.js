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