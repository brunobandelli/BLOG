const Sequelize = require("sequelize");                             //BIBLIOTECA SEQUELIZE
const connection = require("../database/database");                 //CONEXÃO COM O BANCO DE DADOS
const Category = require("../categories/Category");                 //IMPORTANDO O MODEL Category.js

const Article = connection.define('articles',{                      // TABELA: ARTICLES
    title:{                                                         // COLUNA: TITLE
        type: Sequelize.STRING,                                     // TITULO DO TIPO STRING
        allowNull: false                                            // NÃO SERÁ PERMITIDO DADOS NULOS PARA O TITULO DA CATEGORIA
    },slug:{                                                        // AUTODEFINIÇÃO DE ROTA
        type: Sequelize.STRING,                                     // SLUG DO TIPO STRING
        allowNull: false                                            // NÃO SERÁ PERMITIDO DADOS NULOS PARA O SLUG DA CATEGORIA
    },
    body:{                                                          // COLUNA: BODY
        type: Sequelize.TEXT,                                       // CORPO DO TIPO TEXT POR TER BASTANTE COISA ESCRITA
        allowNull: false                                            // NÃO SERÁ PERMITIDO DADOS NULOS PARA O CORPO DO ARTIGO
    }
})

Category.hasMany(Article);                                          // UM ARTIGO PERTENCE A UMA CATEGORIA.
Article.belongsTo(Category);                                        // UMA CATEGORIA TEM MUITOS ARTIGOS.

Article.sync({force: true}); 
module.exports = Article;                                           // EXPORTAÇÃO DO MODULE