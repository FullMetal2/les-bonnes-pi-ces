import { ajoutListenerAvis, ajoutListenerEnvoyerAvis } from "./avis.js";
    // Récupération pièces du fichier JSON //
const reponse = await fetch(`http://localhost:8081/pieces`);
const pieces = await reponse.json();
ajoutListenerEnvoyerAvis();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Boucle for pour affiché toutes les pièces //
function generePieces(pieces){
    for (let i = 0; i < pieces.length; i++) {


    // Création des balises html //
const article = pieces[i]

    // Rattachement au balise du DOM //
const sectionFiches = document.querySelector(".fiches");

const piecesElement =  document.createElement("article");

const imageElement = document.createElement("img");
imageElement.src = article.image;

const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;

const prixElement = document.createElement("p");
prixElement.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "(Pas de description pour le moment)";

const disponibiliteElement = document.createElement("p");
disponibiliteElement.innerText = article.disponibilite ? "En stock" : "En rupture de stock"; 

const avisBouton = document.createElement("button");
avisBouton.dataset.id = article.id;
avisBouton.textContent = "Afficher les avis";


    //Rattachement à la section du DOM //
sectionFiches.appendChild(piecesElement);
piecesElement.appendChild(imageElement);
piecesElement.appendChild(nomElement);
piecesElement.appendChild(prixElement);
piecesElement.appendChild(categorieElement);
piecesElement.appendChild(descriptionElement);
piecesElement.appendChild(disponibiliteElement);
piecesElement.appendChild(avisBouton);
    }
    ajoutListenerAvis();
    
}

generePieces(pieces);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Fonction click  pour trier les pièces par rapport è leurs prix //
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnes = Array.from(pieces);
    
    piecesOrdonnes.sort(function (a, b) {
        return a.prix - b.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    generePieces(piecesOrdonnes);
    console.log(piecesOrdonnes);
});


                //////////////////////////////////////////////////////////
    // Fonction click pour filtrer les pièces moins de 35 euros //
const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    generePieces(piecesFiltrees);
    console.log(piecesFiltrees);
});

                /////////////////////////////////////////////////////////
    //Fonction click pour filtrer les pièces par desciption //
const boutonDescription = document.querySelector(".btn-description");

boutonDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.description;
    });
    document.querySelector(".fiches").innerHTML = "";
    generePieces(piecesFiltrees)
    console.log(piecesFiltrees)
})


                ///////////////////////////////////////////////////////////
    // Fonction click pour tier les pièces par prix décroissant //
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnes = Array.from(pieces);

    piecesOrdonnes.sort(function (a, b) {
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    generePieces(piecesOrdonnes);
    console.log(piecesOrdonnes);
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Fonction MAP pour avoir la liste des pièces mais uniquement avec le nom de celle-ci et retirer de la liste les pièces supérieur à 35 euro //
const noms = pieces.map(pieces => pieces.nom);

for(let i = pieces.length -1; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1)
    }
}
console.log(noms)

            //////////////////////////////////////////////////////////////
    // Creation de l'ent-ête //
const pElement = document.createElement("p")
    pElement.innerText = "Pièces Abordables :"

    // Fonction pour créer un élément liste (UL) pouir faire une liste avec les pièces qui sont inférieur à 35 euro //
const abordableElement = document.createElement("ul");

for(let i=0; i < noms.length ; i++){
    const nomElement = document.createElement("li");
    nomElement.innerText = noms[i];
    abordableElement.appendChild(nomElement)

}

document.querySelector(".abordable")
    .appendChild(pElement)
    .appendChild(abordableElement)


            ///////////////////////////////////////////////////////////////
    //Fonction afficher une liste de pièces disponible avec leurs prix //

const nomsDisponible = pieces.map(pieces => pieces.nom);
const prixDisponible = pieces.map(pieces => pieces.prix);

for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        nomsDisponible.splice(i,1)
        prixDisponible.splice(i,1)
    }
}

console.log(nomsDisponible, prixDisponible)


            ////////////////////////////////////////////////////////////////
const disponibleElement = document.createElement("ul");

for(let i=0; i < nomsDisponible.length ; i++){
    const nomElement = document.createElement("li");
    nomElement.innerText = `${nomsDisponible[i]} - ${prixDisponible[i]} €`
    disponibleElement.appendChild(nomElement)

}

const pElmentDisponible = document.createElement("p")
pElmentDisponible.innerText = "Pièces disponible :"

document.querySelector(".disponible")
    .appendChild(pElmentDisponible)
    .appendChild(disponibleElement)


/////////////////////////////////////////////////////////////////////////////////////////////////////
// fonction input RANGE filtre //

const inputPrixMax = document.querySelector("#prix-max")
inputPrixMax.addEventListener("input", function () {
    const piecesFiltrees = pieces.filter(function(pieces){
        return pieces.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    generePieces(piecesFiltrees);
})