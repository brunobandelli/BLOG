const express = require("express");                                         //MODULO EXPRESS
const app = express();                                                      //ESTANCIA DO EXPRESS
const bodyParser = require("body-parser")                                   //BIBLIOTECA DE FORMULARIO BODYPARSER PARA O EXPRESS
const connection = require("./database/database")                           //IRÁ CARREGAR/IMPORTAR O ARQUIVO DATABASE DENTRO DA PASTA DATABASE
const categoriesController = require("./categories/CategoriesController")   //IMPORTANDO O CategoriesController.js
const articlesController = require("./articles/ArticlesController");        //IMPORTANDO O ArticlesController.js
const Article = require("./articles/Article");                              //IMPORTANDO O Article.js
const Category = require("./categories/Category");                          //IMPOTANDO O Category.js
const usersConstroller = require("./users/UsersController");                //IMPOTANDO O UsersController.s
const User = require("./users/User");                                       //IMPORTANTDO O User.js
const session = require("express-session")                                  //BIBLIOTECA DE SESSÃO DE COOKIES



//View engine
app.set('view engine','ejs');                                          //VIEW ENGINE: EJS

// Sessions
app.get(session({
    secret: "qualquercoisa",                                           //É UM CAMPO DE TEXTO ALEATORIO PARA AUMENTAR A SEGURANÇA DAS SESSÕES, COMO SE FOSSE UMA SENHA PARA DECRIPTAR SUAS SESSÕES, É ROCOMENDADO COLOCAR ALGO BEM ALEATORIO.( É UM TEXTO ALEATORIO QUE O EXPRESS SESSION PEDE PARA AUMENTAR A SEGURANÇA DAS SESSÕES, COMO SE FOSSE O SALT DO BCRYPT )
    cookie: { maxAge: 30000}                                           //TEMPO EM QUE O COOKIE FICA SALVO NA MEMORIA.
}))

// Static
app.use(express.static('public'));                                      //IRA LER/CARREGAR OS ARQUIVOS ESTÁTICOS DENTRO DA PASTA public


//Body parser
app.use(bodyParser.urlencoded({extended: false}));                      //PARA USAR BODYPARSER DENTRO DO EXPRESS
app.use(bodyParser.json());                                             //PARA BODYPARSER ACEITAR JSON


//DATABASE 
connection                                                              //OBJETO DE CONEXÃO (USANDO PROMISSE)
    .authenticate()                                                     //AUTENCAÇÃO DO BANCO DE DADOS
    .then(() =>{                                                        //TENDO SUCESSO
        console.log("Conexão feita com sucesso!");                      //IRÁ APARECER: Conexão feita com sucesso!
    }).catch((error) => {                                               //TENDO FALHA
        console.log("error");                                           //IRÁ APARECER: error
    })

//DEFINIÇÃO DE UTILIZAÇÃO DE CONTROLLERS:
app.use("/",categoriesController);                                      //ROTAS DO ARQUIVO ( CategoriesController.js )	
app.use("/",articlesController);                                        //ROTAS DO ARQUIVO ( ArticlesController.js )	
app.use("/",usersConstroller);                                          //ROTAS DO ARQUIVO ( UsersController.js )

//PAGINA PRINCIPAL
app.get("/", (req, res) => {                                            //ROTA PRINCIPAL
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles => {                                                   //MODEL Article COM METODO FINDALL
        Category.findAll().then(categories => {                             //RENDERIZANDO A VIEW ("index.ejs") COM TODOS OS ARTIGOS NO FRONTEND
            res.render("index",{
                articles: articles,                                         //ARTIGOS DADOS
                categories: categories                                      //CATEGORIAS DADOS, SERÁ UTILIZADA PARA EXIBIR O TITULO DAS CATEGORIAS NA HOMENAVBAR 
            });                       
        })
       
    });
});

//PAGINA DO ARTIGO 
app.get("/:slug",(req, res) => {                                                
    var slug = req.params.slug;
    Article.findOne({                                                          //IREI BUSCAR UMA CATEGORIA, ATRAVÉS DO SLUG DELA
        where: { 
            slug: slug,
        }
    }).then(article => {
        if(article != undefined){                                               
            Category.findAll().then(categories => {                             
                res.render("article",{                                          //RENDERIZANDO A VIEW ("article") COM TODOS OS ARTIGOS NO FRONTEND
                    article: article,                                           //ARTIGOS DADOS
                    categories: categories                                      //CATEGORIAS DADOS, SERÁ UTILIZADA PARA EXIBIR O TITULO DAS CATEGORIAS NA HOMENAVBAR 
                });                       
            })   
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    });
})

//PAGINA FILTRADA DE CATEGORIAS PELA NAVBAR
app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug
    Category.findOne({                                      //BUSCA UNICA DE CATEGORY PELO SLUG
        where:{
            slug: slug                                      //ONDE POSSUA O SLUG
        },
        include: [{model: Article}]                         //INCLUI O MODEL Article NA BUSCA, DENTRO DE UM ARRAY
    }).then( category => {
        if(category !== undefined){
            Category.findAll().then(categories => {         //BUSCA TODAS AS CATEGORIAS
                    res.render("index",{                    //RENDERIZA A PAGINA PRINCIPAL index.ejs
                        articles: category.articles,        //PUXA OS ARTIGOS DA CATEGORIA ATRAVÉS DO RELACIONAMENTO USANDO O JOIN DE INCLUDE ACIMA.
                        categories: categories              //PUXA TODAS AS CATEGORIAS QUE TAMBÉM SERÁ USADA NO HOMENAVBAR
                    });
            });
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    })
})

app.listen(8081, () => {                                                //PORTA DO SERV LOCAL QUE EXECUTA A APP
    console.log("O servidor está rodando")                              //CALLBACK PARA SABER SE O SERV ESTA FUNCIONANDO
})