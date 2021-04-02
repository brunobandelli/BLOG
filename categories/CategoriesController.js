const express = require("express");                             //EXPRESS
const router = express.Router();                                //ROUTER

router.get("/admin/categories/new", (req, res) => {             //ROTA: /admin/categories/new
    res.render("./admin/categories/new")                        //RENDERIZAÇÃO DO ARQ.(new.ejs) DA PASTA views/admin/categories
})

module.exports = router;                                        //EXPORTAÇÃO