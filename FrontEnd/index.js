// // Récupération de la gallerie travaux via l'API

const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

// Lier l'élément gallery en HTML au script JS

const gallery = document.querySelector(".gallery");

// Invisibiliser le contenu HTML de la gallerie travaux

gallery.innerHTML = "";

// Afficher tous les travaux
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

// Options login et log out

// Récupération du token dans le local Storage

const user = window.localStorage.getItem("token");
console.log(user);

// Lier les élements HTML login et logout au script JS
const login = document.querySelector(".login-tab");
const logout = document.querySelector(".logout-tab");

// Vérifier si l'utilisateur est connecté
if (user) {
// Afficher l'onglet logout
    logout.style.display = "block";

    // faire disparaître le titre "mes projets"
    const modifProjets = document.querySelector(".mes-projets-titre");
    modifProjets.innerHTML = "";

    // faire disparaître les filtres
    const mesFiltres = document.querySelector(".filtres-bloc");
    mesFiltres.innerHTML = "";

    // code modale
    // Lier les éléments de la modale en HTML au script JS

    const modalTrigger = document.querySelectorAll(".modal-trigger");
    const modalClose = document.querySelectorAll(".modal-close");
    const modalOverlay = document.querySelector(".modal");


// Ouvrir la modale
modalTrigger.forEach(trigger => {
    trigger.addEventListener("click", async () => {
        const target = document.querySelector(trigger.getAttribute("data-modal-target"));

        target.setAttribute("aria-hidden", "false");
        target.setAttribute("aria-modal", "true");
        modalOverlay.style.display = "flex";

        // créer une constante galleryModal qui est lié à l'HTML
        const galleryModal = document.querySelector(".gallery-modal-figure");

        // créer une constante formulaireModal qui est lié à l'HTML
        const formulaireModal = document.querySelector(".ajout-form");

        // Invisibiliser le contenu HTML de la gallerie modale et du formulaire
        galleryModal.innerHTML = "";
        formulaireModal.innerHTML = "";

        // Afficher les travaux
        const reponse = await fetch("http://localhost:5678/api/works");
        const pieces = await reponse.json();

        pieces.forEach(piece => {
            const figure = document.createElement("figure");
            const image = document.createElement("img");
            const figcaption = document.createElement("figcaption");
            const deleteButton = document.createElement("button");
            const corbeilleIcon = document.createElement("i"); // Créez un élément HTML pour le logo corbeille

            image.src = piece.imageUrl;
            figcaption.innerHTML = "éditer";
            corbeilleIcon.className = "fas fa-trash suppr"; // Ajouter la classe suppr pour sélectionner les éléments

            figure.dataset.id = piece.id; // Ajouter un attribut data-id avec l'identifiant du travail
            galleryModal.appendChild(figure);
            figure.appendChild(deleteButton);
            figure.appendChild(corbeilleIcon);
            figure.appendChild(image);
            figure.appendChild(figcaption);

            // Récupérer tous les éléments corbeilleIcon
            const corbeilleIcons = document.querySelectorAll(".suppr");

            // récupérer la liste des identifiants stockés dans le local storage (s'il existe)
            const deletedWorkIds = JSON.parse(window.localStorage.getItem("deletedWorkIds")) || [];

            corbeilleIcons.forEach(corbeilleIcon => {
            corbeilleIcon.addEventListener("click", function () {
                // récupérer l'identifiant du travail cliqué
                const id = this.closest("figure").dataset.id;
                
                fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                body: JSON.stringify({ id: id }),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
                }).then(() => {
                // ajouter l'identifiant du travail supprimé à la liste
                deletedWorkIds.push(id);
                // stocker la nouvelle liste dans le local storage
                window.localStorage.setItem("deletedWorkIds", JSON.stringify(deletedWorkIds));
                // retirer l'élément supprimé du DOM
                console.log(id);
                // Supprimer l'élément parent "figure" du DOM
                const figure = this.closest("figure");
                figure.remove();
                    });
                });
            });    
        });   
    });
});

    // Fermer la modale
    modalClose.forEach(close => {
        close.addEventListener("click", () => {
            const modal = close.closest(".modal");
            modal.setAttribute("aria-hidden", "true");
            modal.setAttribute("aria-modal", "false");
            modal.style.display = "none";
        });
    });

    // Masquer la modale lorsqu'on clique en dehors de celle-ci
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            modalClose.forEach(close => {
                const modal = close.closest(".modal");
                modal.setAttribute("aria-hidden", "true");
                modal.setAttribute("aria-modal", "false");
                modal.style.display = "none";
            });
        }
    });

} else {
// Afficher l'onglet login
    login.style.display = "block";

    const modif = document.querySelectorAll(".modifier");
    for (let i = 0; i < modif.length; i++) {
        modif[i].innerHTML ="";
    }
    const modifProjets = document.querySelector("#modifier-mes-projets");
    modifProjets.innerHTML = "";
}

// Permettre à l'utilisateur de se déconnecter

// activer le click à lors du log-out
logout.addEventListener("click", function(event) {
    event.preventDefault();
    // vider le local storage
    window.localStorage.clear();

    // basculer vers la page login
    window.location.href = "login.html";
});