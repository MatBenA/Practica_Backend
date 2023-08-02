//configuraciones iniciales de express
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const config = require("./config.json");

//importamos los controladores que recibiran las solicitudes
//y enviarán los resultados
const personController = require("./controller/personController.js");
const userController = require("./controller/userController");

//ejecutamos los controladores de persona y usuario
app.use(personController);
app.use(userController);

//A la escucha de solicitudes en el puerto especificado
app.listen(config.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Escuchando en el puerto ${config.server.port}`);
    }
});
