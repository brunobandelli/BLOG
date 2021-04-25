const express = require("express");                             //EXPRESS
const router = express.Router();                                //ROUTER
const Category = require("./Category");                         //MODEL: Category.js
const slugify = require("slugify");                              //BIBLIOTECA SLUGIFY
const adminAuth = require("../middlewares/adminAuth");        //IMPORTANDO MIDDLEWARE

router.get("/admin/categories/new", adminAuth,(req, res) => {             //ROTA: /admin/categories/new
    res.render("./admin/categories/new")                        //RENDERIZAÇÃO DO ARQ.(new.ejs) DA PASTA views/admin/categories
})

router.post("/categories/save", adminAuth,(req, res) =>{                  //ROTA: /categories/save
    var title = req.body.title;                                 //DADOS DO FORMULÁRIO(new.ejs)
    if(title != undefined){                                     //NÃO PERMITE INSERIR VALORES NULO NO FORMULÁRIO

        Category.create({                                       //MODEL (Category.js) ADD UMA NOVA LINHA
            title: title,                                       //RECEBE A VARIAVEL title DO FORMULÁRIO (new.ejs)
            slug: slugify(title)                                //OTIMIZAÇÃO DE TITULO PARA ROTA
        }).then (() => {                                        //SE DER CERTO
            res.redirect("/admin/categories");                                  //REDIRECIONA PARA ROTA PRINCIPAL
        })


    }else{
        res.redirect("/admin/categories/new");                  //SE VALOR FOR NULO, REDIRECIONA PARA ROTA: /admin/categories/new
    }
})

router.get("/admin/categories", adminAuth,(req,res) =>{                   //ROTA: /admin/categories
    Category.findAll().then(categories =>{                      //ACHAR TODOS OS DADOS DO BANCO DE DADOS NO MODEL Category.js E PASSAR ESSAS INFORMAÇÕES PARA A VARIAVEL categories DENTRO DE THEN
        res.render("admin/categories/index",{                   //RENDERIZA A PAGINA index.ejs DA PASTA views/admin/categories
            categories: categories                              //PASSA OS DADOS DA categories PARA VARIAVEL cacetories, ESSA VARIAVEL POR SUA VÊZ VAI APARECER NA NOSSA VIEW (index.ejs)
        })
    })
})

router.post("/categories/delete", adminAuth,(req, res) =>{                    //ROTA:/categories/delete TIPO POST
    var id = req.body.id;                                           //ESSE É A VARIAVEL QUE IRÁ RECEBER AS INFORMÇÕES DA ID DO FRONTEND PELO FORMULÁRIO //AQUI EU VOU RECEBER O id PELO FORMULARIO DO FRONTEND NA TAG <input name="id" ...> DO ARQ. index.ejs DA PASTA categories
    if(id != undefined){                                            //VERIFICAÇÃO DE ID SE É VALIDO (SE É DIFERENTE DE UNDEFINED)
        if(!isNaN(id)){                                             //VERIFICAÇÃO SE O ID É UM NUMERO (SE É DIFERENTE DE UM NÃO NUMERO)
            Category.destroy({                                      //MODEL: Category // .destroy() : COMANDO DO SEQUELIZE PARA DELETAR.
                where: {                                            //ONDE (ESPECIFICAÇÃO DA LÓGICA)
                    id: id                                          //A id RECEBE O VALOR DA VARIAVEL id QUE CONTEM NO BANCO DE DADOS // OU SEJÁ SEGUINDO A LOGICA DO WHERE: ONDE DELETARÁ A CATEGORIA DO ID RECEBIDO NA VARIAVEL ID
                }                                                   //OU SEJÁ, EU VOU DESTRUIR UMA CATEGORIA NO QUAL MINHA VARIAL id RECEBER O VALOR DA VARIAVEL id DO BANCO DE DADOS
            }).then(() =>{                                          //SE DER CERTO
                res.redirect("/admin/categories");                  //VOU REDIRECIONAR PARA: /admin/categories
            });            
        }else{ // NÃO FOR NÚMERO                                    //SE NÃO FOR NUMÉRICO
            res.redirect("/admin/categories");                      //VOU REDIRECIONAR PARA: /admin/categories
        }
    }else{  // NULL                                                 //SE FOR NULO
        res.redirect("/admin/categories");                          //VOU REDIRECIONAR PARA: /admin/categories
    }
})


router.get("/admin/categories/edit/:id", adminAuth,(req, res) => {
    var id = req.params.id;                                         //VOU RECEBER UM ID QUE VAI VIR DOS PARAMETROS DA MINHA ROTA
    if(isNaN(id)){                                                  //CORREÇAO DO BUG DA ROTA
        res.redirect("/admin/categories")
    }
    Category.findByPk(id).then(category => {                        //MODEL Categody // findByPk() METODO DE PESQUISA //then SE DER CERTO, A CATEGORIA FOR ACHADA
        if(category != undefined) {                                 //SE FOR DIFERENTE DE UNDEFINED
            res.render("admin/categories/edit",{                    //RENDERIZA A VIEW: edit.ejs DENTRO DA PASTA(views/admin/categories)
                category: category                                  //A VAR categoria: VAI RECEBER OS DADOS DA categoria, NO QUAL SERÁ PASSADO ESSAS DADOS PARA A VIEW NO FRONT END.
            });
        }else{                                                      //SE NÃO FOR DIFERENTE DE UNDEFINED
            res.redirect("/admin/categories");
        }
    }).catch(erro => {                                              //SE DER ERRO, NÃO ACHAR A CATEGORIA
        res.redirect("/admin/categories");
    })
})

router.post("/categories/update", adminAuth,(req, res) => {
    var id = req.body.id;                                            //COMO VAMO-S RECEBER O ID ATRAVÉS DO FOMULÁRIO, NÓS VAMOS ACESSAR ATRAVÉS DO .body
    var title = req.body.title;                                      //AQUI TAMBÉM ESTAMOS RECEBENDO O TITULO ATRAVÉS DO FORMULÁRIO DO FRONTEND, POR ISSO UTILIZAREMOS O .body 

    Category.update({                                               //MODEL: Category.js // .update : METODO PARA ATUALIZAR UM DADO NO BANCO DE DADOS PELO SEQUELIZE
        title: title,                                               //ATUALIZARÁ ESSE TITULO ( CONFORME A CONDIÇÃO where A BAIXO)
        slug: slugify(title)                                        //ATUALIZARÁ O SLUG CONFORME O NOVO TITULO
    },{
        where: {                                                    //ONDE A CATEGORIA TEM O ID QUE ESTOU RECEBENDO
            id: id
        }                                                           //OU SEJÁ: ELE ATUALIZARÁ O TITULO DA CATEGORIA ONDE/ NO QUAL O ID FOI RECEBIDO PELO FORMULÁRIO
    }).then(() => {                                                 //SE DER CERTO,
        res.redirect("/admin/categories")                           //REDIRECIONA PARA A ROTA DE CATEGORIAS

    })
})

module.exports = router;                                        //EXPORTAÇÃO