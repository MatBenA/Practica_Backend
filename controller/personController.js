require("rootpath")();
const express = require("express");
const app = express();

const personDB = require("model/personM.js");

app.get("/api/persona", (req, res) => {
    personDB.getAll((err, rows) => {
        if (err) {
            res.status(500).send(err);
            throw err;
        } else {
            res.json(rows);
        }
    });
});

app.post("/api/persona", (req, res) => {
    const newData = Object.values(req.body);
    personDB.create(newData, (err) => {
        if (err) {
            res.status(500).send(err);
            throw err;
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
            throw err;
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
            res.status(500).send(err);
            throw err;
        } else if (result.affectedRows === 0) {
            res.status(404).send(
                `Error: No se encontró persona con el dni: ${dni}.`
            );
        } else {
            res.send(`Persona eliminada con el dni: ${dni}`);
        }
    });
});

module.exports = app;
