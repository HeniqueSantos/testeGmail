const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "henriquedosantos206@gmail.com",
        pass: "zobh fxhe lump vmgd"
    }
});

const codigo = Math.floor(100000 + Math.random() * 900000);
let gmail;

const mailOptions = {
    from: "henriquedosantos206@gmail.com",
    to: `${gmail}`,
    subject: "Codigo de verificação",
    text: `Seu codigo é ${codigo}`
};

transporter.sendMail(mailOptions, (err,info) => {
    if(err){
        console.log(err);
    }else{
        console.log("Email enviado: " + info.response);
    }
});

module.exports = gmail;