require("rootpath")();
const mysql = require("mysql");
const config = require("config.json");

const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err.stack);
        return;
    }
    console.log(`Conectado con la id: ${connection.threadId}`);
});

const userDB = {};

userDB.getAll = function (callBackUsers) {
    const usersQuery = "SELECT * FROM usuario;";
    connection.query(usersQuery, (err, rows) => {
        callBackUsers(err, rows);
    });
};

userDB.create = function (newUser, callBackCreate) {
    const createQuery =
        "INSERT INTO usuario (mail, nickname, password) VALUES (?,?,?);";
    connection.query(createQuery, newUser, (err) => {
        callBackCreate(err, newUser);
    });
};

userDB.update = function (updatedData, callBackUpdate) {
    const queryUpdate = `UPDATE usuario SET mail = ?, nickname = ?, password = ? WHERE mail = ?;`;
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

module.exports = userDB;
