const express = require("express");                             //EXPRESS
const router = express.Router();                                //ROUTER

router.get("/categories",(req, res) => {                        //ROTA: /categories
    res.send("ROTA DE CATEGORIAS")
});

router.get("/admin/categories/new", (req, res) => {             //ROTA: /admin/categories/new
    res.send("ROTA PARA CRIAR UMA NOVA CATEGORIA!")
})

module.exports = router;                                        //EXPORTAÇÃO