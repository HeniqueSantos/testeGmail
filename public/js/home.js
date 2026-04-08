fetch("/usuarios")
.then(res => res.json())
.then(data => {

    document.getElementById("nome").innerText = "Bem vindo " + data.nome;

});