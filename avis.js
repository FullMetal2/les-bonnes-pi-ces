/* global Chart */


export function ajoutListenerAvis() {
    const piecesElement = document.querySelectorAll(".fiches article button");

    for(let i = 0 ;i < piecesElement.length; i++) {
        piecesElement[i].addEventListener("click", async function (event) {
            
            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`)
            const avis = await reponse.json();
            window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis))
            const piecesElement = event.target.parentElement;
            afficherAvis(piecesElement, avis)


        });
    }
}
export function afficherAvis(piecesElement, avis) {
            const avisElement = document.createElement("p");
                for (let i = 0 ; i < avis.length; i++) {
                    avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
                }
            piecesElement.appendChild(avisElement);
};



export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Là c'est bon")
            const avis = {
                pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
                utilisateur: event.target.querySelector("[name=utilisateur]").value,
                commentaire: event.target.querySelector("[name=commentaire]").value,
                nbEtoile: parseInt(event.target.querySelector("[name=nbEtoile]").value),
               
            };
        const chargeUtile = JSON.stringify(avis)

        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: chargeUtile
        });
    });
     
}

export async function afficherGraphiqueAvis() {
    const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
    const nb_commentaires = [0, 0, 0, 0, 0];
        for (let commentaire of avis) {
            nb_commentaires[commentaire.nbEtoile - 1]++;
        }

    const labels = ["5", "4", "3", "2", "1"];

    const data = {
        labels: labels,
        datasets: [{
            label: "étoiles attribuées",
            data: nb_commentaires.reverse(),
            backgroundColor: "rgba(255, 230, 0, 1)",
        }]
    }

    const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "y",
        },
    }
    console.log(nb_commentaires)

    new Chart(
        document.querySelector("#graphique-avis"),
        config,
    );


    // Récupération des pièces depuis le localStorage
    const piecesJSON = window.localStorage.getItem("pieces");
    //const pieces = piecesJSON ? JSON.parse(piecesJSON) : [];
    const pieces = JSON.parse(piecesJSON)
    // Calcul du nombre de commentaires
    let nbCommentairesDispo = 0;
    let nbCommentairesNonDispo = 0;
    //if(pieces.length > 0){
    for (let i = 0; i < avis.length; i++) {
        const piece = pieces.find(p => p.id === avis[i].pieceId);

        if (piece) {
            if (piece.disponibilite) {
                nbCommentairesDispo++;
            } else {
                nbCommentairesNonDispo++;
            }
        }
    }

    // Légende qui s'affichera sur la gauche à côté de la barre horizontale
    const labelsDispo = ["Disponibles", "Non dispo."];

    // Données et personnalisation du graphique
    const dataDispo = {
        labels: labelsDispo,
        datasets: [{
            label: "Nombre de commentaires",
            data: [nbCommentairesDispo, nbCommentairesNonDispo],
            backgroundColor: "rgba(0, 230, 255, 1)", // turquoise
        }],
    };

    // Objet de configuration final
    const configDispo = {
        type: "bar",
        data: dataDispo,
    };
    console.log(dataDispo);
    // Rendu du graphique dans l'élément canvas
    new Chart(
        document.querySelector("#graphique-dispo"),
        configDispo,
    );
}



