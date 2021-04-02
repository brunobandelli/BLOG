const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define('categories',{                   //TABELA: CATEGORIES
    title:{                                                         // COLUNA: TITLE
        type: Sequelize.STRING,                                     // TITULO DO TIPO STRING
        allowNull: false                                            // NÃO SERÁ PERMITIDO DADOS NULOS PARA O TITULO DA CATEGORIA
    },slug:{                                                        // AUTODEFINIÇÃO DE ROTA
        type: Sequelize.STRING,                                     // SLUG DO TIPO STRING
        allowNull: false                                            // NÃO SERÁ PERMITIDO DADOS NULOS PARA O SLUG DA CATEGORIA
    }
})

module.exports = Category;                                          //EXPORTAÇÃO DO MODULE