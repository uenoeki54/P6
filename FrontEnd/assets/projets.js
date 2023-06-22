// Récupération des photos depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
let projets = await reponse.json();
console.log(projets)
// Efface le contenu de la balise gallery et donc les projets
document.querySelector(".gallery").innerHTML = " ";
// Creation de la fonction qui cree les projets au bon endroit depuis le back
function genererProjets(projets) {
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
// Appel de la fonction 
genererProjets(projets)
// ON ESSAYE D AFFICHER LES PROJETS EN FONCTION DE LA CATEGORIE CLIQUEE

// Categorie objets

const btnObjets = document.getElementById("btn-objets")
btnObjets.addEventListener("click", function () {
    const projetsFiltres = projets.filter(function (projet) {
        return projet.categoryId === 1;
        
    });
    console.log(projetsFiltres)
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projetsFiltres);
});