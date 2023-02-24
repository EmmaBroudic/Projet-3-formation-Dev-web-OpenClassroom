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

// bouton sélectionner tout
const boutonTous = document.querySelector(".btn-tous");

boutonTous.addEventListener("click", function () {
    
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
    });

// bouton sélectionner "Objets"

const boutonTrierObj = document.querySelector(".btn-trier-obj");

boutonTrierObj.addEventListener("click", function () {
    // récupérer les travaux correspondant à la catégorie "Objets"
    const objets = works.filter(work => work.categoryId === 1);

    console.log(works);
    console.log(objets);

    // supprimer les travaux précédemment affichés dans la galerie
    gallery.innerHTML = "";

    // afficher les travaux correspondant à la catégorie "Objets"
    objets.forEach(objet => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        image.src = objet.imageUrl;
        figcaption.textContent = objet.title;

        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(figcaption);
    });
});

// bouton sélectionner Appartements

const boutonTrierAppt = document.querySelector(".btn-trier-appt");

boutonTrierAppt.addEventListener("click", function () {
    // récupérer les travaux correspondant à la catégorie "Appartements"
    const appartements = works.filter(work => work.categoryId === 2);

    console.log(works);
    console.log(appartements);

    // supprimer les travaux précédemment affichés dans la galerie
    gallery.innerHTML = "";

    // afficher les travaux correspondant à la catégorie "Appartements"
    appartements.forEach(appartement => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        image.src = appartement.imageUrl;
        figcaption.textContent = appartement.title;

        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(figcaption);
    });
});

// bouton sélectionner "Hôtels & restaurants"

const boutonTrierHotels = document.querySelector(".btn-trier-hotel");

boutonTrierHotels.addEventListener("click", function () {
    // récupérer les travaux correspondant à la catégorie "Appartements"
    const hotels = works.filter(work => work.categoryId === 3);

    console.log(works);
    console.log(hotels);

    // supprimer les travaux précédemment affichés dans la galerie
    gallery.innerHTML = "";

    // afficher les travaux correspondant à la catégorie "Appartements"
    hotels.forEach(hotel => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        image.src = hotel.imageUrl;
        figcaption.textContent = hotel.title;

        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(figcaption);
    });
});

