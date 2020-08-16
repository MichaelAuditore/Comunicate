//Module with all App Routes 

const { Router } = require('express');
const router = Router();
const { connection } = require('../db_connection');

//Auth endpoint to check if user has a valid token
router.get('/auth/:idToken', (req, res) => {
    //get params from URL request
    const idToken = req.params.idToken

    //Execute query
    connection.query('SELECT * FROM users WHERE idToken LIKE ?', [idToken], (err, results, fields) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results[0]);
        }
        else {
            res.status(404).json("Not found");
        }
    });
});

//Add a user into DB
router.post('/create', (req, res) => {
    const { nombre, apellido, correo, idToken } = req.body;

    if (nombre && apellido && correo && idToken) {
        //Execute query
        connection.query('INSERT INTO users (nombre, apellido, correo, idToken) VALUES (?, ?, ?, ?)', [nombre, apellido, correo, idToken], (err, results, fields) => {
            if (err) throw err;
            res.json("Bienvenido a Comunicate!!");
        });

    } else {
        res.status(400).json("Solicitud Errada");
    }
});


//Add a friend
router.post('/addFriend', (req, res) => {
    const { idUsuario, idUsuarioSolicitud } = req.body;
    connection.query('INSERT INTO amigos (idUsuario, idAmigo) VALUES (?, ?)', [idUsuario, idUsuarioSolicitud], (err, results, fields) => {
        if (err) throw err;
        res.json("Solicitud de Amistad Enviada, si acepta tu solicitud lo verás la proxima vez que te conectes en tu lista de amigos");
    });
});

//Confirm Friend Request
router.put('/confirmFriend', (req, res) => {
    const { idUsuario, idUsuarioSolicitud } = req.body;
    //Update amigos to avoid send more friend requests and generate relationship between users
    connection.query('UPDATE amigos SET idSolicitud=1 WHERE idUsuario=? AND idAmigo=?',
        [idUsuarioSolicitud, idUsuario], (err, results, fields) => {
            if (err) throw err;
        });
    //Create relationship between current user who accepts request
    connection.query('INSERT INTO amigos (idUsuario, idAmigo, idSolicitud) VALUES (?, ?, 1)',
        [idUsuario, idUsuarioSolicitud], (err, results, fields) => {
            if (err) throw err;
        });
    res.json("Solicitud Aceptada, ahora puedes hablar con él");
});

//Get Friends of each user in session
router.get('/getFriends/:idUsuario', (req, res) => {
    //convert to int the param req
    const idUsuario = parseInt(req.params.idUsuario);
    //Execute query
    connection.query('SELECT u.id, u.nombre, u.apellido FROM amigos a INNER JOIN users u ON u.id = a.idUsuario WHERE a.idUsuario = ? and a.idSolicitud = 1', [idUsuario], (err, results, fields) => {
        console.log(results);
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.status(404).json("Not found");
        }
    });

    //finish connection

});


//Send message and save it
router.post('/sendMessage/:idUsuario/:idAmigo', (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const idAmigo = parseInt(req.params.idAmigo);
    const { mensaje } = req.body;

    connection.query('INSERT INTO historial (idUsuario, idAmigo, mensaje) VALUES (?, ?, ?)',
        [idUsuario, idAmigo, mensaje], (err, results, fields) => {
            if (err) throw err;
            res.json("Mensaje Enviado exitosamente");
        });
});

//Get all messages between two users
router.get('/getMessages/:idUsuario/:idAmigo', (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const idAmigo = parseInt(req.params.idAmigo);
    //Get all messages in order
    connection.query('SELECT * FROM historial WHERE idUsuario = ? AND idAmigo = ? OR idUsuario = ? AND idAmigo = ? ORDER BY id ASC',
        [idUsuario, idAmigo, idAmigo, idUsuario],
        (err, results, fields) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results);
            }
            else {
                res.status(404).json("Not found");
            }
        });
});


//Search Friends
router.get('/searchPeople/', (req, res) => {

    //Get all people in order
    connection.query('SELECT * FROM users ORDER BY nombre ASC',
        (err, results, fields) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results);
            }
            else {
                res.status(404).json("Not found");
            }
        });

});

//Search by Name
router.get('/searchPeople/:name', (req, res) => {
    const name = req.params.name;
    //Get a person by name
    connection.query('SELECT * FROM users WHERE nombre = ?', [name], (err, results, fields) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.status(404).json("La persona a la que buscas no está conectada a la app");
        }
    });
});


//Get Friend Requests
router.get('/getRequests/:idUsuario', (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    //Request to get Friend request of people would connect with current user
    connection.query('SELECT u.nombre, u.apellido FROM amigos a'
        + ' INNER JOIN users u ON u.id = a.idUsuario WHERE a.idAmigo=? AND idSolicitud=0 ORDER BY u.nombre ASC',
        [idUsuario], (err, results, fields) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results);
            }
            else {
                res.status(404).json("Not found");
            }
        });
})

//Delete Friend Requests
router.delete('/deleteRequests/:idAmigo/:idUsuario', (req, res) => {
    const idAmigo = parseInt(req.params.idAmigo);
    const idUsuario = parseInt(req.params.idUsuario);
    //Request to delete friend request
    connection.query('DELETE FROM amigos WHERE idUsuario=? AND idAmigo=?',
        [idAmigo, idUsuario], (err, results, fields) => {
            if (err) throw err;
        });
    res.json("Solicitud Eliminada con éxito");
});

//Delete Friends
router.delete('/deleteFriends/:idAmigo/:idUsuario', (req, res) => {
    const idAmigo = parseInt(req.params.idAmigo);
    const idUsuario = parseInt(req.params.idUsuario);
    //Request to delete relationship between each friend
    connection.query('DELETE FROM amigos WHERE idUsuario=? AND idAmigo=?',
        [idAmigo, idUsuario], (err, results, fields) => {
            if (err) throw err;
        });
    //Request to delete relationship between each friend
    connection.query('DELETE FROM amigos WHERE idUsuario=? AND idAmigo=?',
        [idUsuario, idAmigo], (err, results, fields) => {
            if (err) throw err;

        });
    res.json("Ya no está en tu lista de amigos");
});


module.exports = router;