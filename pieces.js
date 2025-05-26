    // Récupération pièces du fichier JSON //
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();


    // Boucle for pour affiché toutes les pièces //
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


    //Rattachement à la section du DOM //
sectionFiches.appendChild(piecesElement);
piecesElement.appendChild(imageElement);
piecesElement.appendChild(nomElement);
piecesElement.appendChild(prixElement);
piecesElement.appendChild(categorieElement);
piecesElement.appendChild(descriptionElement);
piecesElement.appendChild(disponibiliteElement);

}


    //Fonction click  pour trier les pièces par rapport è leurs prix //
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnes = Array.from(pieces);
    
    piecesOrdonnes.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnes);
});

    // Fonction click pour filtrer les pièces moins de 35 euros //
const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.prix <= 35;
    });
    console.log(piecesFiltrees);
});

    //Fonction click pour filtrer les pièces par desciption //
const boutonDescription = document.querySelector(".btn-description");

boutonDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.description;
    });
    console.log(piecesFiltrees)
})


    // Fonction click pour tier les pièces par prix décroissant //
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnes = Array.from(pieces);

    piecesOrdonnes.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnes);
})

    // Fonction MAP pour avoir la liste des pièces mais uniquement avec le nom de celle-ci et retirer de la liste les pièces supérieur à 35 euro //
const noms = pieces.map(pieces => pieces.nom);

for(let i = pieces.length -1; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1)
    }
}
console.log(noms)

    // Fonction pour créer un élément liste (UL) pouir faire une liste avec les pièces qui sont inférieur à 35 euro //
const abordableElement = document.createElement("ul");

for(let i=0; i < noms.length ; i++){
    const nomElement = document.createElement("li");
    nomElement.innerText = noms[i];
    abordableElement.appendChild(nomElement)

}

document.querySelector(".abordable")
    .appendChild(abordableElement)

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

const disponibleElement = document.createElement("ul");

for(let i=0; i < nomsDisponible.length ; i++){
    const nomElement = document.createElement("li");
    nomElement.innerText = `${nomsDisponible[i]} - ${prixDisponible[i]} €`
    disponibleElement.appendChild(nomElement)

}

document.querySelector(".disponible")
    .appendChild(disponibleElement)