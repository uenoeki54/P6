//import de la fonction d'affichage
import { genererProjetsModal } from "./fonctions.js";
// Récupération de tous les PROJETS PHOTO depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
let projets = await reponse.json();
console.log(projets);
//premier affichage a l'ouverture de la modale
genererProjetsModal(projets);
