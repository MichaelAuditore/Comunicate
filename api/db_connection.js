//Module to connect to MySQL server to retrieve data from DB

const mysql = require('mysql');

//stablish Connection to access to DB in MySQL
const connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME || '127.0.0.1',
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME || 'root',
    password: process.env.RDS_PASSWORD || 'root',
    database: process.env.RDS_DB_NAME || 'comunicate_db'
});

function createTables() {
    connection.query(
        `CREATE TABLE IF NOT EXISTS users (
            id INT UNIQUE NOT NULL AUTO_INCREMENT,
            nombre VARCHAR(100) NOT NULL,
            apellido VARCHAR(100) NOT NULL,
            correo VARCHAR(100) NOT NULL,
            idToken VARCHAR(256) NOT NULL,
            PRIMARY KEY (id)
        );`, (err, results, fields) => {
        if (err) throw err;
    }
    );
    connection.query(
        `CREATE TABLE IF NOT EXISTS amigos (
            id INT PRIMARY KEY AUTO_INCREMENT,
            idUsuario INT NOT NULL,
            idAmigo INT NOT NULL,
            idSolicitud INT DEFAULT 0,
            CONSTRAINT fk_usuario FOREIGN KEY(idUsuario) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT fk_amigo FOREIGN KEY(idAmigo) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        );`, (err, results, fields) => {
        if (err) throw errr;
    }
    );
    connection.query(
        `CREATE TABLE IF NOT EXISTS historial (
            id INT PRIMARY KEY AUTO_INCREMENT,
            idUsuario INT NOT NULL,
            idAmigo INT NOT NULL,
            mensaje VARCHAR(256) NOT NULL,
            CONSTRAINT fk_husuario FOREIGN KEY(idUsuario) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT fk_hamigo FOREIGN KEY(idAmigo) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        );`, (err, results, fields) => {
        if (err) throw errr;
    }
    );
    console.log("Created Succesfully");
}


module.exports = { connection, createTables };