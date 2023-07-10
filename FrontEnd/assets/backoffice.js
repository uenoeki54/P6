// Import des fonctions eventuelles depuis autre fichier JS pour plus de clarte
import { genererProjets } from "./fonctions.js";
// Récupération des PROJETS PHOTO depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
let projets = await reponse.json();

// Verification token est bien la 
const token = localStorage.getItem('Token');
console.log('valeur token est de : ' + token);
if (token === null) {
    window.location.replace("index.html");
}

// Appel de la fonction 
genererProjets(projets)

//logout

document.getElementById('js-logout').addEventListener('click', function(e) {
    e.preventDefault();
    window.localStorage.removeItem("Token");  
    window.location.replace("index.html");

});