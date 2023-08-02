//El objetivo de este archivo modelo usuario es el de interactuar
//con la base de datos y enviar los resultados al controlador

//configuracion inicial
require("rootpath")();
const mysql = require("mysql");
const config = require("config.json");

//Se inicia la coneccion con la base de datos
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err.stack);
        return;
    }
    console.log(`Conectado con la id: ${connection.threadId}`);
});

//en este objeto se almacenaran los métodos CRUD que serán exportados
const userDB = {};

userDB.getAll = function (callBackUsers) {
    const usersQuery = "SELECT * FROM usuario;";
    connection.query(usersQuery, (err, rows) => {
        callBackUsers(err, rows);
    });
};

userDB.create = function (newUser, callBackCreate) {
    const createQuery =
        "INSERT INTO usuario (mail, nickname, password, persona) VALUES (?,?,?,?);";
    connection.query(createQuery, newUser, (err) => {
        callBackCreate(err, newUser);
    });
};

userDB.update = function (updatedData, callBackUpdate) {
    const queryUpdate = `UPDATE usuario SET mail = ?, nickname = ?, password = ?, persona = ? WHERE mail = ?;`;
    connection.query(queryUpdate, updatedData, (err, results) => {
        callBackUpdate(err, results);
    });
};

userDB.delete = function (mail, callBackDelete) {
    const queryDelete = `DELETE FROM usuario WHERE mail = ?`;
    connection.query(queryDelete, mail, (err, results) => {
        callBackDelete(err, results);
    });
};

userDB.getByEmail = function (email, callBackEmail) {
    const queryEmail = "SELECT * FROM usuario WHERE mail = ?;";
    connection.query(queryEmail, email, (err, result) => {
        callBackEmail(err, result);
    });
};

module.exports = userDB;
