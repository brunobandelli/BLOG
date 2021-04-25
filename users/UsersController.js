const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');                         //BIBLIOTECA DE CRIPTOGRAFIA 

router.get("/admin/users", (req, res) => {
    User.findAll().then(users =>{
        res.render("admin/users/index", {users: users});
    })
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {                            //ROTA DE CRIAÇÃO DE USUARIOS
    var email = req.body.email;                                         //REQUISIÇÃO DO EMAIL RECEBIDO PELO BODY DO FRONTEND
    var password = req.body.password;                                   //REQUISIÇÃO DA SENHA RECEBIDA PELO BODY DO FRONTEND

    User.findOne({where:{email: email}}).then( user => {                //SISTEMA PARA EVITAR DUPLICAÇÃO DE USUARIO
        if(user == undefined ){                                         //SE FOR UM USUARIO INDEFINIDO, PERMITE A CRIAÇÃO
    

    var salt = bcrypt.genSaltSync(10);                                  //INCREMENTA + SEGURANÇA NA CRIPTOGRAFIA DA SENHA
    var hash = bcrypt.hashSync(password, salt);                         //CRIPTOGRAFIA DA SENHA

    User.create({                                                       //CRIA O NOVO USUARIO NO BANCO DE DADOS
        email: email,                                                   //RECEBE O EMAIL PARA O BANCO DE DADOS
        password: hash                                                  // RECEBE A SENHA PARA O BANCO DE DADOS
    }).then(() => {
        res.redirect("/");
    }).catch(() => {
        res.redirect("/");
    })

        }else{                                                          //SE JÁ FOR UM USUARIO DEFINIDO ELE REDIRECIONA PARA UMA PAGINA E EVITA A DUPLICAÇÃO DE CRIAÇÃO DE USUARIO.
            res.redirect("/admin/users/create");
        }
    })
});

router.get("/login", (req, res) => {
    res.render("admin/users/login");
})

router.post("/authenticate", (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where:{
            email: email
        }
    }).then(user => {
        if(user != undefined){              // SE EXISTE UM USUARIO COM ESSE EMAIL
            // VALIDAR SENHA
            var correct = bcrypt.compareSync(password,user.password)    //COMPARAÇÃOD DE SENHAS PELO BCRYPT

            if(correct){
                req.session.user = {                                    //SESSÃO DE USUARIO
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles");
            }else{
                res.redirect("/login")
            }
        }else{
            res.redirect("/login")
        }
    })
})

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
})

module.exports = router;