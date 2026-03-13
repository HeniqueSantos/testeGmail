const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const db = require("./db");
const { send } = require('process');


const app = express();
const port = 3000;




const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "henriquedosantos206@gmail.com",
        pass: "zobh fxhe lump vmgd"
    }
});


app.use(express.static("public"));
app.use(express.json());

app.get('/cadastro', (req,res) => {
    res.sendFile(path.join(__dirname, 'views','cadastro.html'));
});

app.post("/enviar-email", (req,res) => {
    const gmail = req.body.gmail;
    const codigo = Math.floor(100000 + Math.random() * 900000);

    const sql = "INSERT INTO userscode (gmail,codigo) values (?,?)";

    db.query(sql,[gmail,codigo], (err,result) => {
        if (err){
            console.log(err);
        }
    });

    const mailOptions = {
        from: "henriquedosantos206@gmail.com",
        to: `${gmail}`,
        subject: "Codigo de verificação",
        text: `Seu codigo é ${codigo}`
    };

    transporter.sendMail(mailOptions, (err,info) => {
        if(err){
            console.log(err);
            return;
        }

        res.send("Email Enviado!")
    });


});

app.post("/verificar-gmail",(req,res) => {
    const gmail = req.body.gmailDoUser;
    const codigo = req.body.codigoRecebido;
    const senha = req.body.senhaDoUser;
    const nome = req.body.nomeDoUser

    console.log("gmail do malandro :" + gmail);
    console.log("codigo do malando : " + codigo);

    const sql = "SELECT gmail, codigo from userscode WHERE gmail = ? AND codigo = ?";

    db.query(sql,[gmail,codigo], (err,result) =>{
        if(err){
            console.log("sql error : " + err);
            return;
        }

        if(result.length > 0){
            const sqlUpdate = "insert into usuario (nome,gmail,senha) values (?,?,?)";

            db.query(sqlUpdate,[nome,gmail,senha], (err,rs) => {
                if(err){
                    console.log("sql error :" + err);
                    return;
                }

            })

        }else{
            res.send('codigo incorreto');
            return;
        }
    })
});


app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));

});

app.post("/verificar-senha", (req,res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;

    const sql = "SELECT nome,senha FROM usuario WHERE nome = ? and senha = ?";

    db.query(sql,[nome,senha], (err,result) =>{
        if (err){
            console.log("sql error : " + err);
            return;
        }

        if (result.length > 0){
            res.send('login com sucesso!');
        }else {
            res.send('Nome do Usuario ou Senha está incorreto.');
        }
        
    });
});

app.listen(port,(err) => {
    if(err) {
        console.log("ocorreu um erro : " + err);
        return;
    }

    console.log(`servidor funcionando : http://localhost:${port}`);
});