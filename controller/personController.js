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
    personDB.create(newData, (err, newData) => {
        if (err) {
            res.status(500).send(err);
            throw err;
        } else {
            res.send(`se agregó una nueva persona con los siguientes datos ${newData}`);
        }
    });
});

module.exports = app;
