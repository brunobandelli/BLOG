const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Bem vindo ao meu site")
})

app.listen(8081, () => {
    console.log("O servidor está rodando")
})