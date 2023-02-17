fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    body: JSON.stringify({email: email, password: passwords}),
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
}).then(//à coder//données à récupérer au format json)
  .then(//à coder//)