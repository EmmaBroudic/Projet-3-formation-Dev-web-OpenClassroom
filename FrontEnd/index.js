// Récupération de la galerie travaux via l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

// Lier l'élément gallery en HTML au script JS
const gallery = document.querySelector(".gallery");

// Invisibiliser le contenu HTML de la galerie travaux
gallery.innerHTML = "";

/* Écouter l'événement personnalisé "workDeleted" (lié au Fetch Méthode DELETE)
et supprimer de la galerie les éléments qui auront été supprimés dans la modale

Ces fonctionnalités ne seront accessibles qu'à l'utilisateur connecté*/
gallery.addEventListener("workDeleted", (e) => {

    console.log("test-quatre");

    // Récupération de l'id du travail supprimé
    const id = e.detail.id;

    // Lier le travail supprimé au travail présenté dans la galerie hors modale
    const galleryItem = document.querySelector(`[data-id="${id}"]`);

    // Si id de travail supprimé, le supprimer de la galerie
    if (galleryItem) {
        galleryItem.remove();
    }
});

/* Écouter l'événement personnalisé "WorkAdd" (lié au Fetch Méthode POST)
et ajouter dans la galerie les éléments qui auront été ajoutés dans la modale

Ces fonctionnalités ne seront accessibles qu'à l'utilisateur connecté*/
gallery.addEventListener("WorkAdd", (e) => {
    
    console.log("test-trois");

    // Récupération de l'id du travail ajouté
    const id = e.detail.id;
    console.log(id);

    // Récupération de l'image du travail ajouté
    const img = e.detail.img;
    console.log(img);
    
    // Récupération du titre du travail ajouté
    const titl = e.detail.titl;
    console.log(titl);

    // Création d'un nouvel élément figure
    const newFigure = document.createElement("figure");

    // Création d'un nouvel élément img
    const newImage = document.createElement("img");

    // Source de l'image -> élément récupéré dans la constante img ci-dessus
    newImage.src = img;

    // Création d'un nouvel élément figcaption
    const newFigcaption = document.createElement("figcaption");

    // Source du titre -> élément récupéré dans la constante titl ci-dessus
    newFigcaption.textContent = titl;

    // Ajout de l'élément img et figcaption à l'élément figure
    newFigure.appendChild(newImage);
    newFigure.appendChild(newFigcaption);

    // Ajout de l'attribut "data-id" à l'élément figure
    newFigure.dataset.id = id;

    // Ajout de l'élément figure à la galerie
    gallery.appendChild(newFigure);
});

// Afficher tous les travaux dans la galerie principale (hors modale)
works.forEach(work => {

    // Création d'une constante figure (élément parent) qui contiendra les éléments (enfants) image et figcaption
    const figure = document.createElement("figure");

    // Création de constantes pour les éléments image et titre (figcaption)
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    
    // lier chaque élement récupéré via l'API au code HTML
    image.src = work.imageUrl;
    figcaption.textContent = work.title;
    figure.dataset.id = work.id;

    // créer le DOM
    // Element parent du DOM
    gallery.appendChild(figure);
    // ELements enfants du DOM
    figure.appendChild(image);
    figure.appendChild(figcaption);
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
    const filtres = document.querySelector(".filtres-bloc");
    //const mesFiltres = document.querySelector(".filtres-bloc");
    filtres.innerHTML = "";

    // code modale
    // Lier les éléments de la modale en HTML au script JS

    const modalTrigger = document.querySelectorAll(".modal-trigger");
    const modalClose = document.querySelectorAll(".modal-close");
    const modalOverlay = document.querySelector(".modal");


    // Ouvrir la modale
    modalTrigger.forEach(trigger => {

        //  Ecouter l'événement click pour ouvrir la modale
        trigger.addEventListener("click", async (e) => {
            // empêcher la propagation de l'événement "click"
            e.stopPropagation();

            e.preventDefault();

            // Lier la constante target à la modale en HTML
            const target = document.querySelector(trigger.getAttribute("data-modal-target"));
            
            // changer les propriétés de la balise modale (.modal)
            target.setAttribute("aria-hidden", "false");
            target.setAttribute("aria-modal", "true");
            modalOverlay.style.display = "flex";

            // créer une constante galleryModal qui est liée à l'HTML
            const galleryModal = document.querySelector(".gallery-modal-figure");

            // créer une constante formulaireModal qui est liée à l'HTML
            const formulaireModal = document.querySelector(".ajout-form");

            //créer une constante pour le titre galerie qui est liée à l'HTML
            const titreGallery = document.querySelector("#titre-galerie");

            //créer une constante pout le titre supprimer modale qui est liée à l'HTML
            const supprP = document.querySelector("#suppr-modal");

            //créer une constante pour lier le bouton ajout photo à l'HTML
            const boutonAjoutPhoto = document.querySelector("#btn-valider");

            //créer une constante pour lier le bouton ajout photo à l'HTML
            const boutonAjoutPhotoValider = document.querySelector("#btn-valider-deux");

            //créer une constante pour lier le bouton retour à l'HTML
            const boutonRetour = document.querySelector("#modal-retour");

            // Afficher les travaux au sein de la modale "galerie photos"

            // Fonction qui construit la galerie modale et effectue la suppression des travaux
            async function buildModalGallery() {

                // Invisibiliser le contenu HTML de la gallerie modale et du formulaire
                galleryModal.innerHTML = "";
                formulaireModal.style.display = "none";
                boutonAjoutPhotoValider.style.display = "none";

                //effacer le bouton retour
                boutonRetour.style.display = "none";

                // Récupérer les données via l'API
                const reponse = await fetch("http://localhost:5678/api/works");
                const pieces = await reponse.json();

                // boucle qui affiche chaque travaux dans la modale galerie photos
                pieces.forEach(piece => {
                    // Création des éléments parents et enfants qui composeront le DOM de la galerie modale
                    const figure = document.createElement("figure");
                    const image = document.createElement("img");
                    const figcaption = document.createElement("figcaption");
                    // création d'une constante pour bouton de suppression des travaux
                    const deleteButton = document.createElement("button");
                    // création d'une constante pour icone corbeille
                    const corbeilleIcon = document.createElement("i");

                    // Affichage du contenu galerie de la modale
                    // Image d'un des travaux
                    image.src = piece.imageUrl;
                    // texte affiché sous l'image
                    figcaption.innerHTML = "éditer";
                    // icone corbeille qui servira de bouton de suppression des travaux
                    corbeilleIcon.className = "fas fa-trash suppr";

                    // ajout d'un id qui permettra de supprimer les travaux
                    figure.dataset.id = piece.id;

                    // construction du DOM au sein de la modale
                    galleryModal.appendChild(figure);
                    figure.appendChild(deleteButton);
                    figure.appendChild(corbeilleIcon);
                    figure.appendChild(image);
                    figure.appendChild(figcaption);

                    // Récupérer tous les éléments corbeilleIcon
                    const corbeilleIcons = document.querySelectorAll(".suppr");

                    // boucle de la galerie modale actualisée en fonction de la suppression des éléments
                    corbeilleIcons.forEach(corbeilleIcon => {
                        //Ecouter l'événement click pour suppression des travaux
                        corbeilleIcon.addEventListener("click", function (e) {
                            // Eviter la propagation du click
                            e.stopPropagation();
                            // transformer le comportement par défaut de la soumission des données via le formulaire
                            e.preventDefault();
                            // récupérer l'identifiant du travail cliqué
                            const id = this.closest("figure").dataset.id;

                            // supprimer les éléments avec la méthode fetch DELETE
                            fetch(`http://localhost:5678/api/works/${id}`, {
                                method: 'DELETE',
                                body: JSON.stringify({ id: id }),
                                headers: { 'Accept': 'application/json',
                                            'authorization': `Bearer ${user}`,
                                            'Content-Type': 'application/json' }
                            }).then(() => {
                                // Supprimer l'élément parent "figure" du DOM
                                const figure = this.closest("figure");
                                figure.remove();

                                // Supprimer l'élément correspondant dans la galerie principale (hors modale)
                                // Lier l'id de l'élément supprimé au code html
                                const galleryItem = document.querySelector(`[data-id="${id}"]`);

                                // si élément supprimer le retirer de la galerie principale
                                if (galleryItem) {
                                    console.log("hello2");
                                    galleryItem.remove();
                                    // Déclencher un événement personnalisé "workDeleted"
                                    gallery.dispatchEvent(new CustomEvent("workDeleted", { detail: { id: id } }));
                                }
                            });
                        });
                    });
                });
           }

           
           buildModalGallery();

           async function envoiDonneesFormulaire() { 
            // Changer le contenu de la modale après le click sur le bouton ajouter photo
            //  Ecouter l'événement click pour ouvrir la modale
            boutonAjoutPhoto.addEventListener("click", (e) => {
                // empêcher la propagation de l'événement "click"
                e.stopPropagation();

                e.preventDefault();

                // transformer le contenu de la modale pour afficher le formulaire d'ajout photo
                titreGallery.innerHTML = "Ajout photo";
                galleryModal.style.display = "none";
                formulaireModal.style.display = "flex";
                boutonAjoutPhoto.style.display = "none";
                boutonAjoutPhotoValider.style.display = "block";
                supprP.innerHTML = "";
                boutonRetour.style.display = "flex";
  
                // Création d'une variable liée à l'HTML à l'input d'ajout d'image
                let imageInput = document.getElementById("input-photo");

                // Création d'une variable liée à l'HTML qui fait apparaître le bouton d'ajout photo
                const labelImageInput = document.getElementById("label-input-photo");

                /* Création de variables liées à l'HTML pour faire apparaître la miniature
                et transformer le fond de la zone ajout photo une fois l'image chargée */
                const text = document.getElementById("text-ajout");
                const preview = document.getElementById("preview");
                const fond = document.getElementById("ajout-img");
                
                // Chargement de l'image -> apparaît en miniature
                // Ecouter l'événement ajout de l'image
                imageInput.addEventListener("change", () => {
                const file = imageInput.files[0];
                const reader = new FileReader();
                
                // Ecouter l'événement chargement de l'image
                reader.addEventListener("load", () => {
                    preview.setAttribute("src", reader.result);
                });
                
                // si image charger, transformation des CSS pour faire apparaître la miniature et changer le fond
                if (file) {
                    imageInput.style.display = "none";
                    labelImageInput.style.display = "none";
                    text.style.display ="none";
                    preview.style.width = "auto";
                    preview.style.height = "115px";
                    fond.style.backgroundColor = "rgba(0, 0, 255, 0.4)";
                    fond.style.padding = "0";
                    boutonAjoutPhotoValider.style.backgroundColor = "#1D6154";
                    reader.readAsDataURL(file);
                }
            });

            
                // click sur le bouton Valider - méthode fetch envoi données à l'API
                formulaireModal.addEventListener("submit", function (e) {

                    // transformer le comportement par défaut de la soumission des données via le formulaire
                    e.preventDefault();

                    // Eviter la propagation du click
                    e.stopPropagation();

                    //e.target();

                    // Créer des variables liées aux inputs en HTML
                    let titleInput = document.getElementById("title");
                    let categoryInput = document.getElementById("category");

                    // test console
                    console.log(imageInput, titleInput, categoryInput);
                        
                    // Créer un objet FormData pour stocker les données
                    let formData = new FormData();
                    formData.append("image", imageInput.files[0]);
                    formData.append("title", titleInput.value);
                    formData.append("category", categoryInput.value);

                    // tests console
                    console.log(formData, "hello");
                    console.log(user);

                    // Envoyer les données dans l'API avec la méthode POST
                    fetch("http://localhost:5678/api/works", {
                        method: 'POST',
                        body: formData,
                        headers: { 'Accept': 'application/json',
                                    'authorization': `Bearer ${user}`,
                                }
                    })
                
                    // Gérer la réponse de l'API
                    .then(resp => {
                        // Vérifier si la réponse est ok
                        if(resp.ok) {
                        // Traiter la réponse de l'API
                        console.log("ok");
                        // Message pour l'utilisateur
                        alert("Ajout réussi !");
                        e.stopPropagation();
                        e.preventDefault();
                        imageInput.value = null;
                        imageInput.style.display = "block";
                        labelImageInput.style.display = "block";

                        // Transformer les données au format JSON pour qu'elles soient reçues par l'API
                        return resp.json();
                        
                        
                        } else {
                        // informer l'utilisateur de l'échec de la requête
                        alert("Le formulaire n'a pas été complété correctement");
                        e.stopPropagation();
                        e.preventDefault();
                        }
                    })

                    // Traiter la réponse de l'API
                    .then(data => {
                        // Verif
                        console.log(data);

                        /* créer des constantes liées à chaque élément de l'ajout de travail pour pouvoir
                        actualiser le DOM de la galerie principale hors modale */
                        const id = data.id;
                        const img = data.imageUrl;
                        const titl = data.title;
                        const cat = data.categoryId; // ou data["_id"], selon la structure de la réponse de l'API
                        console.log(`Identifiant généré : ${id}`);
                        console.log(id);

                        if (id) {
                            console.log("test");
                            console.log(id);
                            console.log(titl);
                            console.log(cat);
                            console.log(img);

                            /* Déclenchement d'un événement personnalisé pour actualiser le DOM
                            dans la galerie principale hors modale */
                            const actuGalerie = new CustomEvent("WorkAdd", { detail: { id, img, titl, cat } });
                            gallery.dispatchEvent(actuGalerie);
                          }

                    })
                        
                    // Gérer les erreurs
                    .catch(error => {
                        console.error(error);
                        alert("Echec");
                    });

                    /*.finally {
                    // réactiver le bouton d'envoi de données une fois que la requête est terminée
                    boutonAjoutPhoto.setAttribute('disabled', '');
                  }*/
                });            
            });
        }
        
        envoiDonneesFormulaire();

        // Rendre fonctionnel le bouton retour
        boutonRetour.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            buildModalGallery();
            //formulaireModal.style.display = "none";
            titreGallery.innerHTML = "Galerie photo";
            galleryModal.style.display = "grid";
            boutonAjoutPhoto.style.display = "flex";
            //boutonAjoutPhotoValider.style.display = "none";
            supprP.innerHTML = "Supprimer la galerie";
            //effacer le bouton retour
            //boutonRetour.style.display = "none";                             
            });

        });   
    });

    // Fermer la modale
    modalClose.forEach(close => {
        // Ecouter l'événement click pour fermeture modale
        close.addEventListener("click", (e) => {
            // Eviter la propagation du click
            e.stopPropagation();
            // Création d'une constante modal qui est liée au code HTML
            const modal = close.closest(".modal");
            // transformer les attributs de la balise qui possède la class .modal
            modal.setAttribute("aria-hidden", "true");
            modal.setAttribute("aria-modal", "false");
            modal.style.display = "none";
            location.reload();
        });
    });

    // Masquer la modale lorsqu'on clique en dehors de celle-ci
    // Ecouter l'événement click
    modalOverlay.addEventListener("click", (e) => {
        // Condition qui permet fermeture modale quand on click en dehors
        if (e.target === modalOverlay) {
            // Eviter la propagation du click
            e.stopPropagation();
            // Fermeture modale
            modalClose.forEach(close => {
                const modal = close.closest(".modal");
                modal.setAttribute("aria-hidden", "true");
                modal.setAttribute("aria-modal", "false");
                modal.style.display = "none";
                // Rechargement de la page à la fermeture modale
                location.reload();
            });
        }
    });

} else {
    // Afficher l'onglet login sur l'utilisateur n'est pas connecté
    login.style.display = "block";

    // Masquer les boutons modifier (fonctionnalités accessibles en mode connecté)
    const modif = document.querySelectorAll(".modifier");
    for (let i = 0; i < modif.length; i++) {
        modif[i].innerHTML ="";
    }

    // Masquer le bouton d'ouverture de la modale (fonctionnalités accessibles en mode connecté)
    const modifProjets = document.querySelector("#modifier-mes-projets");
    modifProjets.innerHTML = "";

    const filtres = document.querySelector(".filtres-bloc");

    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(travaux => {
        // Créer un tableau de toutes les catégories uniques
        const categories = [];
        travaux.forEach(travail => {
        if (!categories.includes(travail.category.name)) {
            categories.push(travail.category.name);
        }
        });
        
        // Créer un bouton pour chaque catégorie unique
        categories.forEach(catName => {
        const boutonsFiltres = document.createElement("button");
        boutonsFiltres.textContent = catName;
        boutonsFiltres.classList.add("btnsFiltres");
        boutonsFiltres.classList.add("btn-tous");

        filtres.appendChild(boutonsFiltres);

        // addEventListener
        boutonsFiltres.addEventListener("click", function () {

            // Récupérer l'ID de la catégorie correspondante
            const catId = travaux.find(travail => travail.category.name === catName).categoryId;

            // Filtrer les travaux en fonction de l'ID de la catégorie
            const filtresTravaux = travaux.filter(travail => travail.categoryId === catId);
            
            gallery.innerHTML = "";

            filtresTravaux.forEach(filtreTravail => {
                // Création des éléments parents et enfants qui composeront le DOM
                const figure = document.createElement("figure");
                const image = document.createElement("img");
                const figcaption = document.createElement("figcaption");

                // Lier les éléments récupérés via l'API au code HTML
                image.src = filtreTravail.imageUrl;
                figcaption.textContent = filtreTravail.title;

                // créer le DOM
                gallery.appendChild(figure);
                figure.appendChild(image);
                figure.appendChild(figcaption);
            });
        });
        });
    })
    .catch(error => console.error(error));

    // Rafraîchir la page pour faire apparaître tous les travaux quand on clique sur le bouton "tous"
    const boutonTousLesTravaux = document.querySelector(".btn-tous");

    boutonTousLesTravaux.addEventListener("click", function () {
        location.reload();
    });
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

