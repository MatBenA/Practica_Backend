require("rootpath")();
const express = require("express");
const app = express();

const personDB = require("model/personM.js");

app.get("/api/persona", (req, res) => {
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

app.post("/api/persona", (req, res) => {
    const newData = Object.values(req.body);
    personDB.create(newData, (err) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.status(409).send(
                    "Error: ya existe un usuario con este dni"
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

app.delete("/api/persona/:dni", (req, res) => {
    const dni = req.params.dni;
    personDB.delete(dni, (err, result) => {
        if (err) {
            if (err.code === "ER_ROW_IS_REFERENCED_2") {
                res.status(500).send(
                    "ER_ROW_IS_REFERENCED_2\n esta persona posee uno o más usuarios \nsi desea eliminar esta persona primero elimine su/s usurio/s"
                );
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
