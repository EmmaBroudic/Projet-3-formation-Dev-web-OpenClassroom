// const reponse = await fetch("http://localhost:5678/api-docs/");
// const travaux = await response.json();

const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

// Récupération de la gallerie travaux

const gallery = document.querySelector(".gallery");

// Invisibiliser le contenu HTML de la gallerie travaux

gallery.innerHTML = "";

// Afficher les travaux
works.forEach(work => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    image.src = work.imageUrl;
    figcaption.textContent = work.title;

    gallery.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(figcaption);
});

// Tri à partir des filtres
// Faire trois boutons qui filtrent chacun pour une catégorie
// bouton sélectionner tout


// bouton sélectionner Objets

const reponseBoutonObjets = await fetch("http://localhost:5678/api/categories");
const categories = await reponseBoutonObjets.json();

const boutonTrier = document.querySelector(".btn-trier-obj");

boutonTrier.addEventListener("click", function () {
    const objets = categories.map(categorie => categorie.objets);
    for(let i = categories.length -1 ; i >= 0; i--){
    if(categories[i].name != "Objets"){
        objets.splice(i,1)
   }
}
console.log(objets)
});
