const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users',{                   //TABELA: CATEGORIES
    email:{                                                         // COLUNA: email
        type: Sequelize.STRING,                                     // TITULO DO TIPO STRING
        allowNull: false                                            // NÃO SERÁ PERMITIDO DADOS NULOS PARA O TITULO DA CATEGORIA
    },password:{                                                    // COLUNA: password
        type: Sequelize.STRING,                                     // SLUG DO TIPO STRING
        allowNull: false                                            // NÃO SERÁ PERMITIDO DADOS NULOS PARA O SLUG DA CATEGORIA
    }
})



module.exports = User;                                              //EXPORTAÇÃO DO MODULE