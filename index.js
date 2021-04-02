const express = require("express");                                         //MODULO EXPRESS
const app = express();                                                      //ESTANCIA DO EXPRESS
const bodyParser = require("body-parser")                                   //BIBLIOTECA DE FORMULARIO BODYPARSER PARA O EXPRESS
const connection = require("./database/database")                           //IRÁ CARREGAR/IMPORTAR O ARQUIVO DATABASE DENTRO DA PASTA DATABASE
const categoriesController = require("./categories/CategoriesController")   //IMPORTANDO O CategoriesController.js
const articlesController = require("./articles/ArticlesController");        //IMPORTANDO O ArticlesController.js
const Article = require("./articles/Article");                              //IMPORTANDO O Article.js
const Category = require("./categories/Category");                          //IMPOTANDO O Category.js

//View engine
app.set('view engine','ejs');                                          //VIEW ENGINE: EJS

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

app.use("/",categoriesController);                                      //ROTAS DO ARQUIVO ( CategoriesController.js )	
app.use("/",articlesController);                                        //ROTAS DO ARQUIVO ( ArticlesController.js )	

app.get("/", (req, res) => {                                            //ROTA PRINCIPAL
    res.render("index");                                                //RENDERIZANDO A VIEW ("index.ejs")
})

app.listen(8081, () => {                                                //PORTA DO SERV LOCAL QUE EXECUTA A APP
    console.log("O servidor está rodando")                              //CALLBACK PARA SABER SE O SERV ESTA FUNCIONANDO
})