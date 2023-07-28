require("rootpath")();
const mysql = require("mysql");
const config = require("config.json");

const connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("base de datos conectada");
    }
});

const personDB = {};

personDB.getAll = function (callbackPerson) {
    const allPersonsQuery = "SELECT * FROM persona";
    connection.query(allPersonsQuery, (err, rows) => {
        if (err) {
            callbackPerson(err);
        } else {
            callbackPerson(undefined, rows);
        }
    });
};

personDB.create = function (newData, callBackCreate) {
    const createPerson =
        "INSERT INTO persona (dni, nombre, apellido) VALUES (?,?,?);";

    connection.query(createPerson, newData, err => callBackCreate(err, newData));
};

module.exports = personDB;
