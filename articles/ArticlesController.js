const express = require("express");                           //EXPRESS
const router = express.Router();                              //ROUTER
const Category = require("../categories/Category")            //IMPORTANDO MODEL Category  
const Article = require("./Article");                         //MODEL: Article
const slugify = require("slugify");                           //BIBLIOTECA DO SLUGIFY

router.get("/admin/articles",(req, res) => {                        //ROTA: /articles
    res.send("ROTA DE ARTIGOS")
});

router.get("/admin/articles/new", (req, res) => {             //ROTA: /admin/articles/new
    Category.findAll().then(categories => {                   //RECEBE TODAS AS CATEGORIAS
        res.render("admin/articles/new",{                     //RENDERIZA A NEW
            categories: categories                            //PASSA AS CATEGORIAS PARA A VARIAVEL CATEGORIAS QUE SERÁ UTILIZADA NO FRONTEND.
        })
    })
})

router.post("/articles/save",(req, res) => {
    var title = req.body.title;                              // CORPO DO CAMPO NAME TITLE DO HTML 
    var body = req.body.body;                                // CORPO DO CAMPO NAME BODY DO HTML
    var category = req.body.category;                        // CORPO DO CAMPO NAME CATEGORY DO HTML

    Article.create({                                        // MODEL (Article.js) ADD UMA NOVA LINHA NO BANCO DE DADOS
        title: title,                                       // RECEBE O VALOR DA VARIAVEL title DO FORMULÁRIO (new.ejs)
        slug: slugify(title),                               // ATUALIZARÁ O SLUG CONFORME O NOVO TITULO
        body: body,                                         // RECEBE O VALOR DA VARIAVEL body DO FORMULÁRIO (new.ejs)
        categoryId: category,                               // REBE O ID DA CATEGORIA
        
    }).then(() => {
        res.redirect("/admin/articles");
    });
});
module.exports = router;                                      //EXPORTAÇÃO