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