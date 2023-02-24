// déclarer les constantes formulaire et bouton, les lier au code html

const formulaire = document.querySelector(".login-form");
const submitButton = document.querySelector(".submit-btn");

// activer le click à la soumission des données formulaires (email et mot de passe)
formulaire.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // récupérer les données email et mot de passe, les lier au code html
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // comparer les données utilisateur (email et mot de passe) aux données conservées dans l'API

    // récupérer les données dans l'API - méthode POST
    fetch("http://localhost:5678/api/users/login", {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })

      // passer les données au format JSON
      .then(response => response.json())

      // comparer les données utilisateur
      .then(data => {
        
        // tester sur la console la récupération des données
        console.log(data);
        console.log(email);
        console.log(password);
        
        // si les données sont les bonnes, connexion réussie
        if (data.token) {
          alert("Connexion réussie !");
          
          // conserver les données dans le local storage
          window.localStorage.setItem("token", data.token);
          
          // basculer vers la page d'accueil
          window.location.href = "index.html";
          
          console.log(data.userId);
          console.log(data.token);
          
          // Si les données utilisateurs sont incorrectes, lui indiquer par un message
          } else {
          alert("Identifiants incorrects.");

          }
      })
      
      .catch(error => console.error(error));
});