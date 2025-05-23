// Récupération pièces du fichier JSON //
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();


    // Boucle for pour affiché toutes les pièces //
for (let i = 0; i < pieces.length; i++) {


    // Création des balises html //
const article = pieces[i]

// Rattachemenst au balise du DOM //
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



sectionFiches.appendChild(piecesElement);
piecesElement.appendChild(imageElement);
piecesElement.appendChild(nomElement);
piecesElement.appendChild(prixElement);
piecesElement.appendChild(categorieElement);
piecesElement.appendChild(descriptionElement);
piecesElement.appendChild(disponibiliteElement);

}

const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnes = Array.from(pieces);
    
    piecesOrdonnes.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnes);
});


const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.prix <= 35;
    });
    console.log(piecesFiltrees);
});


const boutonDescription = document.querySelector(".btn-description");

boutonDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.description;
    });
    console.log(piecesFiltrees)
})

const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnes = Array.from(pieces);

    piecesOrdonnes.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnes);
})


const noms = pieces.map(pieces => pieces.nom);
for(let i = pieces.length -1; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1)
    }
}
console.log(noms)

const abordableElement = document.createElement("ul");


for(let i=0; i < noms.length ; i++){
    const nomElement = document.createElement("li");
    nomElement.innerText = noms[i];
    abordableElement.appendChild(nomElement)
}

document.querySelector(".abordable")
    .appendChild(abordableElement)