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

router.get("/admin/categories", (req,res) =>{                   //ROTA: /admin/categories
    Category.findAll().then(categories =>{                      //ACHAR TODOS OS DADOS DO BANCO DE DADOS NO MODEL Category.js E PASSAR ESSAS INFORMAÇÕES PARA A VARIAVEL categories DENTRO DE THEN
        res.render("admin/categories/index",{                   //RENDERIZA A PAGINA index.ejs DA PASTA views/admin/categories
            categories: categories                              //PASSA OS DADOS DA categories PARA VARIAVEL cacetories, ESSA VARIAVEL POR SUA VÊZ VAI APARECER NA NOSSA VIEW (index.ejs)
        })
    })
})

module.exports = router;                                        //EXPORTAÇÃO