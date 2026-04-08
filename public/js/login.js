const senhaInput = document.getElementById("input-senha");
const nomeInput = document.getElementById("input-nome");

function login(){
    const nome = nomeInput.value;
    const senha = senhaInput.value;


    senhaInput.value = "";
    nomeInput.value = "";

    console.log('ta funfando!');
    console.log(`nome : ${nome}, senha : ${senha}`);


    fetch("/verificar-senha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            senha: senha
        })
    })
    .then(res => res.text())
    .then(data => {
            window.location.href = "/home";
    });
}