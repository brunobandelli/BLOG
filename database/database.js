const Sequelize = require("sequelize");                                     //Biblioteca Sequelize

const connection = new Sequelize('guiapress','root','mysqlbn94',{           //COMUNICAÇÃO COM O SERVIDOR
    host: 'localhost',                                                      //LOCALIZAÇÃO DO SERVIDOR
    dialect: 'mysql'                                                        //TIPO DE BANCO DE DADOS
});

module.exports = connection;                                                //MODULO PARA EXPORTAÇÃO DA CONEXÃO PARA OS OUTROS ARQUIVOS