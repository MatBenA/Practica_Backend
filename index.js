require("rootpath")();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const config = require("config.json");

app.listen(config.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Escuchando en el puerto ${config.server.port}`);
    }
});