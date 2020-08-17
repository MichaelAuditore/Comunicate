//Module with all App Routes 
require('dotenv').config();

const { Router } = require('express');
const router = Router();
const { connection } = require('../db_connection');
const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) console.log(err);
        req.user = user;
        next();
    })

}

//Auth endpoint to check if user has a valid token
router.get('/login/:id', authenticateToken, (req, res) => {
    //get params from URL request
    const idToken = req.params.id;
    //Execute query
    connection.query('SELECT id FROM users WHERE idToken LIKE ?', [idToken], (err, results) => {
        res.setHeader('Content-Type', 'application/json');
        if (err) return res.status(401).json({ errMessage: "No fue posible la transacción" });
        if (results.length > 0) {
            res.status(200).json(results);
        }
        else {
            res.status(404).json("Not found");
        }
    });
});

//Add a user into DB
router.post('/create', (req, res) => {
    const { nombre, apellido, correo, idToken } = req.body;
    res.setHeader('Content-Type', 'application/json');
    if (nombre && apellido && correo && idToken) {
        //Execute query
        connection.query('INSERT INTO users (nombre, apellido, correo, idToken) VALUES (?, ?, ?, ?)',
            [nombre, apellido, correo, idToken], (err) => {
                if (err) return res.status(401).json({ errMessage: "No fue posible la transacción" });
                res.json({ success: "Bienvenido a Comunicate!!" });
            });

    } else {
        res.status(400).json("Solicitud Errada");
    }
});


//Add a friend
router.post('/addFriend', authenticateToken, (req, res) => {
    const { idUsuario, idUsuarioSolicitud } = req.body;

    res.setHeader('Content-Type', 'application/json');
    connection.query('INSERT INTO amigos (idUsuario, idAmigo) VALUES (?, ?)', [idUsuario, idUsuarioSolicitud],
        (err) => {
            if (err) return res.status(401).json({ errMessage: "No fue posible la transacción" });
            res.json({ success: "Solicitud de Amistad Enviada, si acepta tu solicitud lo verás la proxima vez que te conectes en tu lista de amigos" });
        });
});

//Confirm Friend Request
router.put('/confirmFriend', authenticateToken, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { idUsuario, idUsuarioSolicitud } = req.body;
    //Update amigos to avoid send more friend requests and generate relationship between users
    connection.query('UPDATE amigos SET idSolicitud=1 WHERE idUsuario=? AND idAmigo=?',
        [idUsuarioSolicitud, idUsuario], (err) => {
            if (err) return res.status(401).json("No fue posible la transacción");
        });
    //Create relationship between current user who accepts request
    connection.query('INSERT INTO amigos (idUsuario, idAmigo, idSolicitud) VALUES (?, ?, 1)',
        [idUsuario, idUsuarioSolicitud], (err) => {
            if (err) return res.status(401).json("No fue posible la transacción");
        });

    res.json({ success: "Solicitud Aceptada, ahora puedes hablar con él" });
});

//Get Friends of each user in session
router.get('/getFriends/:idUsuario', authenticateToken, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //convert to int the param req
    const idUsuario = parseInt(req.params.idUsuario);
    //Execute query
    connection.query('SELECT u.id, u.nombre, u.apellido FROM amigos a INNER JOIN users u ON u.id = a.idAmigo WHERE a.idUsuario = ? and a.idSolicitud = 1',
        [idUsuario], (err, results) => {
            if (err) return res.status(401).json("No fue posible la transacción");;
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
router.post('/sendMessage/:idUsuario/:idAmigo', authenticateToken, (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const idAmigo = parseInt(req.params.idAmigo);
    const { mensaje } = req.body;

    res.setHeader('Content-Type', 'application/json');

    connection.query('INSERT INTO historial (idUsuario, idAmigo, mensaje) VALUES (?, ?, ?)',
        [idUsuario, idAmigo, mensaje], (err) => {
            if (err) return res.status(401).json({ errMessage: "No fue posible la transacción" });
            res.json({ success: "Mensaje Enviado exitosamente" });
        });
});

//Get all messages between two users
router.get('/getMessages/:idUsuario/:idAmigo', authenticateToken, (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const idAmigo = parseInt(req.params.idAmigo);

    res.setHeader('Content-Type', 'application/json');
    //Get all messages in order
    connection.query('SELECT * FROM historial WHERE idUsuario = ? AND idAmigo = ? OR idUsuario = ? AND idAmigo = ? ORDER BY id ASC',
        [idUsuario, idAmigo, idAmigo, idUsuario],
        (err, results) => {
            if (err) return res.status(401).json("No fue posible la transacción");
            if (results.length > 0) {

                res.json(results);
            }
            else {
                res.status(404).json("Not found");
            }
        });
});

//Get all messages of user
router.get('/getAllMessages/:idUsuario', authenticateToken, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const idUsuario = parseInt(req.params.idUsuario);
    connection.query('SELECT h.*, u.nombre, u.apellido FROM historial h INNER JOIN users ON u.idUsuario = h.idAmigo WHERE h.idUsuario = ?',
        [idUsuario], (err, results) => {
            if (err) return res.status(401).json("No fue posible la transacción");
            if (results.length > 0) {
                res.json(results);
            }
            else {
                res.status(404).json("Not found");
            }
        })
})

//Search Friends
router.get('/searchPeople/', authenticateToken, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //Get all people in order
    connection.query('SELECT * FROM users ORDER BY nombre ASC',
        (err, results) => {
            if (err) return res.status(401).json("No fue posible la transacción");
            if (results.length > 0) {
                res.json(results);
            }
            else {
                res.status(404).json("Not found");
            }
        });

});

//Search by Name
router.get('/searchPeople/:name', authenticateToken, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const name = req.params.name;
    //Get a person by name
    connection.query('SELECT * FROM users WHERE nombre = ?', [name], (err, results) => {
        if (err) return res.status(401).json("No fue posible la transacción");
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.status(404).json("La persona a la que buscas no está conectada a la app");
        }
    });
});


//Get Friend Requests
router.get('/getRequests/:idUsuario', authenticateToken, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const idUsuario = parseInt(req.params.idUsuario);
    //Request to get Friend request of people would connect with current user
    connection.query('SELECT u.nombre, u.apellido FROM amigos a'
        + ' INNER JOIN users u ON u.id = a.idUsuario WHERE a.idAmigo=? AND idSolicitud=0 ORDER BY u.nombre ASC',
        [idUsuario], (err, results) => {
            if (err) return res.status(401).json("No fue posible la transacción");
            if (results.length > 0) {
                res.json(results);
            }
            else {
                res.status(404).json("Not found");
            }
        });
})

//Delete Friend Requests
router.delete('/deleteRequests/:idAmigo/:idUsuario', authenticateToken, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const idAmigo = parseInt(req.params.idAmigo);
    const idUsuario = parseInt(req.params.idUsuario);
    //Request to delete friend request
    connection.query('DELETE FROM amigos WHERE idUsuario=? AND idAmigo=?',
        [idAmigo, idUsuario], (err) => {
            if (err) return res.status(401).json("No fue posible la transacción");
        });

    res.json({ success: "Solicitud Eliminada con éxito" });
});

//Delete Friends
router.delete('/deleteFriends/:idAmigo/:idUsuario', authenticateToken, (req, res) => {
    const idAmigo = parseInt(req.params.idAmigo);
    const idUsuario = parseInt(req.params.idUsuario);
    res.setHeader('Content-Type', 'application/json');
    //Request to delete relationship between each friend
    connection.query('DELETE FROM amigos WHERE idUsuario=? AND idAmigo=?',
        [idAmigo, idUsuario], (err) => {
            if (err) return res.status(401).json("No fue posible la transacción");
        });
    //Request to delete relationship between each friend
    connection.query('DELETE FROM amigos WHERE idUsuario=? AND idAmigo=?',
        [idUsuario, idAmigo], (err) => {
            if (err) return res.status(401).json("No fue posible la transacción");
        });

    res.json({ success: "Ya no está en tu lista de amigos" });
});


module.exports = router;