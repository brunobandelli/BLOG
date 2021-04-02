const express = require("express");                           //EXPRESS
const router = express.Router();                              //ROUTER

router.get("/articles",(req, res) => {                        //ROTA: /articles
    res.send("ROTA DE ARTIGOS")
});

router.get("/admin/articles/new", (req, res) => {             //ROTA: /admin/articles/new
    res.send("ROTA PARA CRIAR UM NOVO ARTIGO!")
})

module.exports = router;                                      //EXPORTAÇÃO