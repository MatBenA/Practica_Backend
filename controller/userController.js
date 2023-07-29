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
    console.log(req.body);
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

module.exports = app;
