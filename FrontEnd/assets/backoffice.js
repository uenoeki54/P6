// Import des fonctions eventuelles depuis autre fichier JS pour plus de clarte
import { genererProjets } from "./fonctions.js";
// Récupération des PROJETS PHOTO depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
let projets = await reponse.json();

// Creation de la fonction qui cree les projets au bon endroit depuis le back

// Appel de la fonction 
genererProjets(projets)