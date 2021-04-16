const express = require("express");                           //EXPRESS
const router = express.Router();                              //ROUTER
const Category = require("../categories/Category")            //IMPORTANDO MODEL Category  
const Article = require("./Article");                         //MODEL: Article
const slugify = require("slugify");                           //BIBLIOTECA DO SLUGIFY

router.get("/admin/articles",(req, res) => {                  //ROTA: /articles
    Article.findAll({                                         //PESQUISA OS DADOS DO MODEL Article
        include: [{model: Category}]                          //INCLUINDO DADOS DA CATEGORIA NA BUSCA DE ARTIGOS.
    }).then(articles => {                                     //RECEBE TODOS OS ARTIGOS
        res.render("admin/articles/index",{                   //RENDERIZA A INDEX
            articles:articles                                 //PASSA OS ARTIGOS PARA A VARIAVEL ARTICLES QUE SERÁ UTILIZADA NA FRONTEND
        });
    });
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

router.post("/articles/delete", (req, res) =>{                      //ROTA:/articles/delete TIPO POST
    var id = req.body.id;                                           //ESSE É A VARIAVEL QUE IRÁ RECEBER AS INFORMÇÕES DA ID DO FRONTEND PELO FORMULÁRIO //AQUI EU VOU RECEBER O id PELO FORMULARIO DO FRONTEND NA TAG <input name="id" ...> DO ARQ. index.ejs DA PASTA categories
    if(id != undefined){                                            //VERIFICAÇÃO DE ID SE É VALIDO (SE É DIFERENTE DE UNDEFINED)
        if(!isNaN(id)){                                             //VERIFICAÇÃO SE O ID É UM NUMERO (SE É DIFERENTE DE UM NÃO NUMERO)
            Article.destroy({                                       //MODEL: Article // .destroy() : COMANDO DO SEQUELIZE PARA DELETAR.
                where: {                                            //ONDE (ESPECIFICAÇÃO DA LÓGICA)
                    id: id                                          //A id RECEBE O VALOR DA VARIAVEL id QUE CONTEM NO BANCO DE DADOS // OU SEJÁ SEGUINDO A LOGICA DO WHERE: ONDE DELETARÁ O ARTIGO DO ID RECEBIDO NA VARIAVEL ID
                }                                                   //OU SEJÁ, EU VOU DESTRUIR UM ARTIGO NO QUAL MINHA VARIAL id RECEBER O VALOR DA VARIAVEL id DO BANCO DE DADOS
            }).then(() =>{                                          //SE DER CERTO
                res.redirect("/admin/articles");                    //VOU REDIRECIONAR PARA: /admin/articles
            });            
        }else{ // NÃO FOR NÚMERO                                    //SE NÃO FOR NUMÉRICO
            res.redirect("/admin/articles");                        //VOU REDIRECIONAR PARA: /admin/articles
        }
    }else{  // NULL                                                 //SE FOR NULO
        res.redirect("/admin/articles");                            //VOU REDIRECIONAR PARA: /admin/articles
    }
})

router.get("/admin/articles/edit/:id",(req, res) => {
    var id = req.params.id;
    Article.findByPk(id).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
            res.render("admin/articles/edit", {
                categories: categories,
                
            });
        });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/")
    });
})

module.exports = router;                                      //EXPORTAÇÃO