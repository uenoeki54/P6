// Import des fonctions eventuelles depuis autre fichier JS pour plus de clarte
import { genererProjets } from "./fonctions.js";
// Récupération des PROJETS PHOTO depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
let projets = await reponse.json();

// Creation de la fonction qui cree les projets au bon endroit depuis le back

// Appel de la fonction 
genererProjets(projets)
// ON ESSAYE D AFFICHER LES PROJETS EN FONCTION DE LA CATEGORIE CLIQUEE

// Categorie objets

const btnObjets = document.getElementById("btn-objets")
btnObjets.addEventListener("click", function () {
    const projetsFiltres = projets.filter(function (projet) {
        return projet.categoryId === 1

    });
    genererProjets(projetsFiltres)
})
// Categorie APPARTS
const btnApparts = document.getElementById("btn-apparts")
btnApparts.addEventListener("click", function () {
    const projetsFiltres = projets.filter(function (projet) {
        return projet.categoryId === 2

    });
    genererProjets(projetsFiltres)
})
// Categorie HOTELS 
const btnHotels = document.getElementById("btn-hotels")
btnHotels.addEventListener("click", function () {
    const projetsFiltres = projets.filter(function (projet) {
        return projet.categoryId === 3

    });
    genererProjets(projetsFiltres)
})

// Categorie reset TOUS
const btnAll = document.getElementById("btn-tous")
btnAll.addEventListener("click", function () {
    genererProjets(projets)
})

