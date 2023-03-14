// Récupération de la gallerie travaux via l'API
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
    // Écouter l'événement personnalisé "workDeleted" et supprimer de la galerie les éléments qui auront été sélectionnés
    gallery.addEventListener("workDeleted", (event) => {
        const id = event.detail.id;
        const galleryItem = document.querySelector(`[data-id="${id}"]`);
        if (galleryItem) {
            galleryItem.remove();
        }
    });

    image.src = work.imageUrl;
    figcaption.textContent = work.title;
    figure.dataset.id = work.id;

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
    const modalClose = document.querySelectorAll("#modal-close");
    const modalOverlay = document.querySelector(".modal");


    // Ouvrir la modale
    modalTrigger.forEach(trigger => {
        trigger.addEventListener("click", async (e) => {
            e.stopPropagation(); // empêcher la propagation de l'événement "click"
            const target = document.querySelector(trigger.getAttribute("data-modal-target"));
            // changer les propriétés de la balise modale (.modal)
            target.setAttribute("aria-hidden", "false");
            target.setAttribute("aria-modal", "true");
            modalOverlay.style.display = "flex";

            // créer une constante galleryModal qui est lié à l'HTML
            const galleryModal = document.querySelector(".gallery-modal-figure");

            // créer une constante formulaireModal qui est lié à l'HTML
            const formulaireModal = document.querySelector(".ajout-form");

            //créer une constante pout le titre gallerie qui est lié à l'HTML
            const titreGallery = document.querySelector("#titre-galerie");

            //créer une constante pout le titre supprimer modale qui est lié à l'HTML
            const supprP = document.querySelector("#suppr-modal");

            //créer une constante pour lier le bouton ajout photo à l'HTML
            const boutonAjoutPhoto = document.querySelector("#btn-valider");

            //créer une constante pour lier le bouton ajout photo à l'HTML
            const boutonAjoutPhotoValider = document.querySelector("#btn-valider-deux");

            // Invisibiliser le contenu HTML de la gallerie modale et du formulaire
            galleryModal.innerHTML = "";
            formulaireModal.style.display = "none";
            boutonAjoutPhotoValider.style.display = "none";

            // Empêcher la propagation de l'événement de clic vers la modale lorsque l'utilisateur clique sur le bouton #btn-valider
            boutonAjoutPhoto.addEventListener("click", (e) => {
                e.stopPropagation();
            });

            boutonAjoutPhoto.addEventListener("click", function () {
                titreGallery.innerHTML = "Ajout photo";
                galleryModal.style.display = "none";
                formulaireModal.style.display = "flex";
                boutonAjoutPhoto.style.display = "none";
                boutonAjoutPhotoValider.style.display = "block";
                supprP.innerHTML = "";
              
                boutonAjoutPhotoValider.addEventListener("click", function () {
                    const image = document.getElementById("btn-ajout-photo");
                    const title = document.getElementById("title").value;
                    const category = document.getElementById("category").value;
              
                  // Envoyer les données dans l'API avec la méthode POST
                  fetch("http://localhost:5678/api/works", {
                    method: 'POST',
                    body: JSON.stringify({ image: image, title: title, category: category }),
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
                  })
              
                  // Gérer la réponse de l'API
                  .then(resp => {
                    // Vérifier si la réponse est ok
                    if(resp.ok) {
                      // Traiter la réponse de l'API
                      return resp.json();
                    } else {
                      // Gérer l'erreur si la réponse n'est pas ok
                      throw new Error("Erreur lors de l'envoi des données");
                    }
                  })
              
                  // Traiter la réponse de l'API
                  .then(data => {
                    // Faire quelque chose avec les données de l'API, par exemple les afficher à l'utilisateur
                    console.log(data);
                  })
                  
                  // Gérer les erreurs
                  .catch(error => {
                    console.error(error);
                    alert("Echec");
                  });
                });
              });

            // Afficher les travaux
            const reponse = await fetch("http://localhost:5678/api/works");
            const pieces = await reponse.json();

            // boucle qui affiche chaque travaux dans la modale
            pieces.forEach(piece => {
                const figure = document.createElement("figure");
                const image = document.createElement("img");
                const figcaption = document.createElement("figcaption");
                const deleteButton = document.createElement("button");
                const corbeilleIcon = document.createElement("i");

                image.src = piece.imageUrl;
                figcaption.innerHTML = "éditer";
                corbeilleIcon.className = "fas fa-trash suppr";

                // ajout d'un id qui permettra de supprimer les travaux
                figure.dataset.id = piece.id;
                // construction du DOM
                galleryModal.appendChild(figure);
                figure.appendChild(deleteButton);
                figure.appendChild(corbeilleIcon);
                figure.appendChild(image);
                figure.appendChild(figcaption);



                // Récupérer tous les éléments corbeilleIcon
                const corbeilleIcons = document.querySelectorAll(".suppr");

                // boucle de la galerie modale actualisée en fonction de la suppression des éléments
                corbeilleIcons.forEach(corbeilleIcon => {
                    corbeilleIcon.addEventListener("click", function () {
                        // récupérer l'identifiant du travail cliqué
                        const id = this.closest("figure").dataset.id;

                        // supprimer les éléments avec la méthode fetch DELETE
                        fetch(`http://localhost:5678/api/works/${id}`, {
                            method: 'DELETE',
                            body: JSON.stringify({ id: id }),
                            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
                        }).then(() => {
                            // Supprimer l'élément parent "figure" du DOM
                            const figure = this.closest("figure");
                            figure.remove();

                            // Supprimer l'élément correspondant dans la galerie principale (hors modale)
                            const galleryItem = document.querySelector(`[data-id="${id}"]`);
                            if (galleryItem) {
                                galleryItem.remove();
                                // Déclencher un événement personnalisé "workDeleted"
                                gallery.dispatchEvent(new CustomEvent("workDeleted", { detail: { id: id } }));
                            }
                        });
                    });
                });
            });    
        });   
    });

    // Fermer la modale
    modalClose.forEach(close => {
        close.addEventListener("click", (e) => {
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

    /*// Lier les éléments de la modale en HTML au script JS
    const modalDeuxTrigger = document.querySelector(".modal-deux-trigger");
    const modalDeuxClose = document.querySelector(".modal-deux-close");
    const modalDeuxOverlay = document.querySelector(".modal-deux");

    modalDeuxTrigger.addEventListener("click", async (e) => {
        e.stopPropagation(); // empêcher la propagation de l'événement "click"
        const targetDeux = document.querySelector(modalDeuxTrigger.getAttribute("data-modal-deux-target"));
        targetDeux.setAttribute("aria-hidden", "false");
        targetDeux.setAttribute("aria-modal", "true");
        modalDeuxOverlay.style.display = "flex";
      });
      
      modalDeuxClose.addEventListener("click", (e) => {
        e.preventDefault(); // empêcher le comportement par défaut de l'événement "click"
        e.stopPropagation(); // empêcher la propagation de l'événement "click"
        const modalDeux = e.modalDeux.closest(".modal-deux");
        modalDeux.setAttribute("aria-hidden", "true");
        modalDeux.setAttribute("aria-modal", "false");
        modalDeuxOverlay.style.display = "none";
      });
      
      // Masquer la modale deux lorsqu'on clique en dehors de celle-ci
      modalDeuxOverlay.addEventListener("click", (e) => {
        if (e.target === modalDeuxOverlay) {
          const modalDeux = modalDeuxClose.closest(".modal-deux");
          modalDeux.setAttribute("aria-hidden", "true");
          modalDeux.setAttribute("aria-modal", "false");
          modalDeuxOverlay.style.display = "none";
        }
      });*/

} else {
    // Afficher l'onglet login
    login.style.display = "block";

    // Masquer les boutons modifier
    const modif = document.querySelectorAll(".modifier");
    for (let i = 0; i < modif.length; i++) {
        modif[i].innerHTML ="";
    }

    // Masquer le bouton d'ouverture de la modale
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

