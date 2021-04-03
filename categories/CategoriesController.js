const express = require("express");                             //EXPRESS
const router = express.Router();                                //ROUTER
const Category = require("./Category");                         //MODEL: Category.js
const slugify = require("slugify");                              //BIBLIOTECA SLUGIFY

router.get("/admin/categories/new", (req, res) => {             //ROTA: /admin/categories/new
    res.render("./admin/categories/new")                        //RENDERIZAÇÃO DO ARQ.(new.ejs) DA PASTA views/admin/categories
})

router.post("/categories/save", (req, res) =>{                  //ROTA: /categories/save
    var title = req.body.title;                                 //DADOS DO FORMULÁRIO(new.ejs)
    if(title != undefined){                                     //NÃO PERMITE INSERIR VALORES NULO NO FORMULÁRIO

        Category.create({                                       //MODEL (Category.js) ADD UMA NOVA LINHA
            title: title,                                       //RECEBE A VARIAVEL title DO FORMULÁRIO (new.ejs)
            slug: slugify(title)                                //OTIMIZAÇÃO DE TITULO PARA ROTA
        }).then (() => {                                        //SE DER CERTO
            res.redirect("/");                                  //REDIRECIONA PARA ROTA PRINCIPAL
        })


    }else{
        res.redirect("/admin/categories/new");                  //SE VALOR FOR NULO, REDIRECIONA PARA ROTA: /admin/categories/new
    }
})

module.exports = router;                                        //EXPORTAÇÃO