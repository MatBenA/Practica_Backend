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
            callbackPerson(err, rows);
    });
};

personDB.create = function (newData, callBackCreate) {
    const createPerson =
        "INSERT INTO persona (dni, nombre, apellido) VALUES (?,?,?);";

    connection.query(createPerson, newData, (err) =>
        callBackCreate(err, newData)
    );
};

personDB.update = function (dni, updatedData, callBackUpdate) {
    const queryUpdate = `UPDATE persona SET dni = ?, nombre = ?, apellido = ? WHERE dni = ${dni};`;

    connection.query(queryUpdate, updatedData, (err, result) => {
        callBackUpdate(err, result);
    });
};

personDB.delete = function (dni, callBackDelete) {
    const queryDelete = "DELETE FROM persona WHERE dni = ?;";
    connection.query(queryDelete, dni, (err, result) => {
            callBackDelete(err, result);
    });
};

module.exports = personDB;
