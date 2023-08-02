//El objetivo de este archivo controlador es el de recibir solicitudes
//y enviar respuestas

//configuracion de inicial de roothpath y express
require("rootpath")();
const express = require("express");
const app = express();

//importacion de los métodos del modelo persona que se encargará de interactuar con la base de datos
const personDB = require("model/personM.js");

//en este metodo get se manejan todas las peticiones de informacion
app.get("/api/persona", (req, res) => {
    //en el caso de haber una query apellido se devolveran usuarios con el apellido especificado
    if (req.query.apellido) {
        const apellido = req.query.apellido;
        personDB.getByApellido(apellido, (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else if (results.length === 0) {
                res.status(404).send(
                    `No se encontró persona con el apellido: ${apellido}`
                );
            } else {
                res.send(results);
            }
        });
        //en el caso de que se busque el nickname de una persona se usará su dni como parametro query de búsqueda
    } else if (req.query.UserOfDni) {
        const dni = req.query.UserOfDni;
        personDB.getUser(dni, (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else if (results.length === 0) {
                res.status(404).send("Esta persona no posee un usuario.");
            } else {
                res.send(results);
            }
        });
        //se devolveran todas las personas con su información
    } else {
        personDB.getAll((err, rows) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(rows);
            }
        });
    }
});

//Método POST que por medio del cual se crean una nueva persona
app.post("/api/persona", (req, res) => {
    const newData = Object.values(req.body); //transforma los valores del objeto body en un array
    personDB.create(newData, (err) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.status(409).send(
                    "Error: ya existe una persona con este dni"
                );
            } else if (err) {
                res.status(500).send(err);
            }
        } else {
            res.send(
                `se agregó una nueva persona con los siguientes datos ${newData}`
            );
        }
    });
});

//Método PUT por medio del cual se actualiza los de una persona dado su DNI
app.put("/api/persona/:dni", (req, res) => {
    const dni = req.params.dni;
    const updatedData = Object.values(req.body);
    personDB.update(dni, updatedData, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.affectedRows === 0) {
            res.status(404).send(
                `Error: No se encontró persona con el dni: ${dni}.`
            );
        } else {
            res.send(
                `persona con actualizada con éxito. Nuevos datos: ${updatedData}`
            );
        }
    });
});

//Método DELETE por el cual se borra una persona dado su DNI
app.delete("/api/persona/:dni", (req, res) => {
    const dni = req.params.dni;
    personDB.delete(dni, (err, result) => {
        if (err) {
            if (err.code === "ER_ROW_IS_REFERENCED_2") {
                res.status(500).send(
                    "ER_ROW_IS_REFERENCED_2\n esta persona posee uno o más usuarios \nsi desea eliminar esta persona primero elimine su/s usurio/s"
                );
                return;
            }
        }
        if (result.affectedRows === 0) {
            res.status(404).send(
                `Error: No se encontró persona con el dni: ${dni}.`
            );
        } else {
            res.send(`Persona eliminada con el dni: ${dni}`);
        }
    });
});

module.exports = app;
