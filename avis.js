export function ajoutListenerAvis() {
    const piecesElement = document.querySelectorAll(".fiches article button");

    for(let i = 0 ;i < piecesElement.length; i++) {
        piecesElement[i].addEventListener("click", async function (event) {
            
            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`)
            const avis = await reponse.json();
            const piecesElement = event.target.parentElement;

            const avisElement = document.createElement("p");
                for (let i = 0 ; i < avis.length; i++) {
                    avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
                }
            piecesElement.appendChild(avisElement);
        });
    }
}


export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Là c'est bon")
            const avis = {
                pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
                utilisateur: event.target.querySelector("[name=utilisateur]").value,
                commentaire: event.target.querySelector("[name=commentaire]").value,
               
            };
        const chargeUtile = JSON.stringify(avis)

        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: chargeUtile
        });
    });
     
}