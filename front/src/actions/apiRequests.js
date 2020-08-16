const requests = {};

const URL = "http://comunicate-env.eba-umny9swh.us-east-1.elasticbeanstalk.com/";

const miInit = {
    method: '',
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
    mode: 'cors',
    cache: 'default'
};

//Get id from DB
requests.getId = async function (idToken) {
    miInit.method = "GET";
    fetch(URL + 'auth/' + idToken, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Create User in DB
requests.createUser = async function (name, lastName, email, idToken) {
    miInit.method = "POST";
    console.log(name, lastName, email, idToken);

    miInit.body = JSON.stringify({
        "nombre": name,
        "apellido": lastName,
        "correo": email,
        "idToken": idToken
    });
    fetch(URL + 'create', miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Add Friend or send Friend Request
requests.addFriend = async function (idUsuario, idUsuarioSolicitud) {
    miInit.method = "POST";
    miInit.body = JSON.stringify({
        "idUsuario": idUsuario,
        "idUsuarioSolicitud": idUsuarioSolicitud
    });
    fetch(URL + 'addFriend', miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Confirm Friend Request
requests.confirmRequest = async function (idUsuario, idUsuarioSolicitud) {
    miInit.method = "PUT";
    miInit.body = JSON.stringify({
        "idUsuario": idUsuario,
        "idUsuarioSolicitud": idUsuarioSolicitud
    });
    fetch(URL + 'confirmFriend', miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}


//Get added Friends
requests.getFriends = async function (personId) {
    miInit.method = "GET";
    fetch(URL + 'getFriends/' + personId, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}


//Save Messages of a conversation between friends
requests.saveMessage = async function (idUsuario, idAmigo, msg) {
    miInit.method = "POST";
    miInit.body = JSON.stringify({
        "mensaje": msg
    });
    fetch(URL + 'sendMessage/' + idUsuario + '/' + idAmigo, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Get Messages of a conversation between friends
requests.getMessages = async function (idUsuario, idAmigo) {
    miInit.method = "GET";
    fetch(URL + 'getMessages/' + idUsuario + '/' + idAmigo, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

// Search People By Name
requests.searchPeopleByName = async function (personName) {
    miInit.method = "GET";
    fetch(URL + 'searchPeople/' + personName, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
};

// Search People
requests.searchPeople = async function () {
    miInit.method = "GET";
    fetch(URL + 'searchPeople/', miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
};

//Get Friend Requests
requests.getRequests = async function (personId) {
    miInit.method = "GET";
    fetch(URL + 'getRequests/' + personId, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Delete Friend Requests
requests.deleteRequests = async function (idAmigo, personId) {
    miInit.method = "DELETE";
    fetch(URL + 'deleteRequests/' + idAmigo + '/' + personId, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Delete Friends
requests.deleteFriends = async function (idAmigo, personId) {
    miInit.method = "DELETE";
    fetch(URL + 'deleteFriends/' + idAmigo + '/' + personId, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}


module.exports = requests;