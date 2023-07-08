//import de la fonction d'affichage
import { genererProjetsModal } from "./fonctions.js";
import { genererProjets } from "./fonctions.js";

// Récupération de tous les PROJETS PHOTO depuis l'API
let reponse = await fetch('http://localhost:5678/api/works');
let projets = await reponse.json();
console.log(projets);
//premier affichage a l'ouverture de la modale
genererProjetsModal(projets);

//SUPPRESSION D UN PROJET DE LA BASE DE DONNEES
const galleryModal = document.querySelector(".gallery-modal");
console.log(galleryModal);
galleryModal.addEventListener('click', (event) => {
    event.preventDefault();
    //Verifier que l on clique bien sur une icone poubelle ou sur la div qui l entoure
    if (event.target.classList.contains('js-thrash')) {
        //il faut recuperer l element parent a savoir la figure qui contient l icone
        const figure = event.target.closest('figure');
        //recuperer la classe correspondante, a savoir un simple numero
        const projectId = figure.id;

        //acces au token stocké dans localstorage lors du login 
        const token = localStorage.getItem('Token');
        //envoyer une requete pour supprimer le projet de la database
        let deleteRequest = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        fetch(`http://localhost:5678/api/works/${projectId}`, deleteRequest)
            .then(function (res) {
                console.log(res)
                if (res.ok) {
                    //efface le projet supprimed du DOM
                    figure.innerHTML = "";


                    /*efface le projet dans le DOM de l apage d acceuil
                   */
                const figureBack = document.querySelector('.number' + projectId);
                figureBack.innerHTML = "";
                } else {
                    console.error('erreur dans la suppression de l element');
                }
            })/*.then(response => {
                return response.json();
            }).then(payload => { 
                console.log(payload);
                const projects = payload;
                console.log(projects);
                genererProjets(projects);
            
        })*/

    }
})





