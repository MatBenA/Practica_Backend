//El objetivo de este archivo controlador es el de recibir solicitudes
//y enviar respuestas

//configuracion de inicial de roothpath y express
require("rootpath")();
const express = require("express");
const app = express();

//importacion de los métodos del modelo usuario que se encargará de interactuar con la base de datos
const userDB = require("model/userM.js");

//Método GET encargado de recibir peticiones de datos y enviar resultados
app.get("/api/users", (req, res) => {
    //en el caso de haber una query email se devolverá los datos del usuario con el que coincida
    if (req.query.email) {
        const email = req.query.email;
        userDB.getByEmail(email, (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else if (results.length === 0) {
                res.status(404).send(
                    `No se encontraron usuarios con el email: ${email}`
                );
            } else {
                res.send(results);
            }
        });
    //Se devolverán los datos de todos los usuarios
    } else {
        userDB.getAll((err, rows) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(rows);
            }
        });
    }
});

//Método POST por el que se crea un nuevo usuario
app.post("/api/users", (req, res) => {
    const newUser = Object.values(req.body);

    //En la posición 3 iría el dni de la persona, pero caso de que no se envíe ningún dni
    //simplemente se le asignará el valor nulo a esta posicion.
    if (!newUser[3]) {
        newUser[3] = null;
    }

    userDB.create(newUser, (err) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.status(409).send(
                    "Error: ya existe un usuario con este e-mail"
                );
            } else {
                res.status(500).send(err);
            }
        } else {
            res.send(`Se agregó el usuario con el mail: ${newUser[0]}`);
        }
    });
});

//Método PUT encargado de acutalizar datos de un usuario dado su mail
app.put("/api/users/:mail", (req, res) => {
    const mail = req.params.mail;
    const updatedData = Object.values(req.body);
    if(!updatedData[3]){ //en el caso de no enviarse un dni se le asignara el valor nulo
        updatedData[3] = null;
    }
    updatedData.push(mail);
    userDB.update(updatedData, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send(`No se encontró usuario con el mail ${mail}`);
        } else {
            res.send(`Se actualizó el usuario correctamente`);
        }
    });
});

//Método DELETE encargado de borrar un usuario dado su mail
app.delete("/api/users/:mail", (req, res) => {
    const mail = req.params.mail;
    userDB.delete(mail, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send(`No se encontró usuario con el mail ${mail}`);
        } else {
            res.send(`Se eliminó el usario con el mail: ${mail}`);
        }
    });
});

module.exports = app;
