const nomeInput = document.getElementById("name");
const gmailInput = document.getElementById("gmail");
const senhaInput = document.getElementById("senha");
const codigoInput = document.getElementById("codigo");
const enviarButton = document.getElementById("button-cadastrar");

enviarButton.addEventListener('click', function(e){
    nome = nomeInput.value;
    gmail = gmailInput.value;
    senha = senhaInput.value;
    e.preventDefault()

    console.log
        (`
        nome : ${nome}
        gmail : ${gmail}
        senha : ${senha}`
    );

    const pop = document.getElementById("div-do-codigo");
    pop.style.display = 'flex';


    fetch("enviar-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            gmail: gmail
        })
    })
    .then(res => res.text())
    .then(data => (data));
});

function fechar(){
    const pop = document.getElementById("div-do-codigo");
    pop.style.display = 'none';
}

function enviar(){
   nome = nomeInput.value;
   gmail = gmailInput.value;
   codigo = codigoInput.value;
   senha = senhaInput.value;
   

    fetch("/verificar-gmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            gmailDoUser: gmail,
            codigoRecebido: codigo,
            senhaDoUser: senha,
            nomeDoUser: nome
            
        })
    })
    .then(res => res.text())
    .then(data => (data));
    console.log(gmail);
    console.log(codigo);
}