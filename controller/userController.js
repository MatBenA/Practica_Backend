require("rootpath")();
const express = require("express");
const app = express();

const userDB = require("model/userM.js");

app.get("/api/users", (req, res) => {
    userDB.getAll((err, rows) => {
        if (err) {
            res.status(500).send(err);
            throw err;
        } else {
            res.send(rows);
        }
    });
});

app.post("/api/users", (req, res) => {
    const newUser = Object.values(req.body);
    userDB.create(newUser, (err) => {
        if (err) {
            res.status(500).send(err);
            throw err;
        } else {
            res.send(`Se agregó el usuario con el mail: ${newUser[0]}`);
        }
    });
});

app.put("/api/users/:mail", (req, res) => {
    const mail = req.params.mail;
    const updatedData = Object.values(req.body);
    updatedData.push(mail);
    userDB.update(updatedData, (err, results) => {
        if (err) {
            res.status(500).send(err);
            throw err;
        } else if (results.affectedRows === 0) {
            res.status(404).send(`No se encontró usuario con el mail ${mail}`);
        } else {
            res.send(`Se actualizó el usuario con los datos: ${updatedData}`);
        }
    });
});

app.delete("/api/users/:mail", (req, res) => {
    const mail = req.params.mail;
    userDB.delete(mail, (err, results) => {
        if (err) {
            res.status(500).send(err);
            throw err;
        } else if (results.affectedRows === 0) {
            res.status(404).send(`No se encontró usuario con el mail ${mail}`);
        } else {
            res.send(`Se eliminó el usario con el mail: ${mail}`);
        }
    });
});

module.exports = app;
