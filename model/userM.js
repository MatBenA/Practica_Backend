require("rootpath")();
const mysql = require("mysql");
const config = require("config.json");

const connection = mysql.createConnection(config.database);
connection.connect(err => {
    if(err){
        console.log(err.stack);
        return;
    }
    console.log(`Conectado con la id: ${connection.threadId}`);
})

const userDB = {};

userDB.getAll = function(callBackUsers){
    const usersQuery = "SELECT * FROM usuario;";
    connection.query(usersQuery, (err, rows) => {
        callBackUsers(err, rows);
    });
};

module.exports = userDB;