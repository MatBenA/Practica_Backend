require("rootpath")();
const express = require("express");
const app = express();

const userDB = require("model/userM.js");

app.get("/api/users", (req, res) => {
    userDB.getAll((err, rows) => {
        if(err){
            res.status(500).send(err);
            throw err;
        }
        else{
            res.send(rows);
        }
    });
});

module.exports = app;
