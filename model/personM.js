//El objetivo de este archivo modelo persona es el de interactuar
//con la base de datos y enviar los resultados al controlador

//configuracion inicial
require("rootpath")();
const mysql = require("mysql");
const config = require("config.json");

//Se inicia la coneccion con la base de datos
const connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("base de datos conectada");
    }
});

//en este objeto se almacenaran los métodos CRUD que serán exportados
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

personDB.getByApellido = function (apellido, callBackApellido) {
    const queryApellido = "SELECT * FROM persona WHERE apellido = ?;";
    connection.query(queryApellido, apellido, (err, results) =>
        callBackApellido(err, results)
    );
};

personDB.getUser = function (dni, callBackUser) {
    const queryNickname =
        "SELECT nickname FROM usuario INNER JOIN persona ON persona.dni = usuario.persona WHERE persona.dni = ?;";
    connection.query(queryNickname, dni, (err, results) => {
        callBackUser(err, results);
    });
};

module.exports = personDB;
