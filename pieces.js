// Récupération pièces du fichier JSON //
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

// Création des balises html //
const article =  pieces[0]

const imageElements = document.createElement("img");
imageElements.src = article.image;

const nomElements = document.createElement("h2");
nomElements.innerText = article.nom;

const prixElement = document.createElement("p");
prixElement.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "(Pas de description pour le moment)";

const disponibiliteElement = document.createElement("p");
disponibiliteElement.innerText = article.disponibilite ? "En stock" : "En rupture de stock"; 


// Rattachemenst au balise du DOM //
const sectionFiches = document.querySelector(".fiches");

sectionFiches.appendChild(imageElements);
sectionFiches.appendChild(nomElements);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);
sectionFiches.appendChild(descriptionElement);
sectionFiches.appendChild(disponibiliteElement);

