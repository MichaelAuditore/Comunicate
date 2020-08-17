const Request = require('request');
const requests = {};

requests.URL = 'comunicateApi-env.eba-cfcaskzv.us-east-1.elasticbeanstalk.com/api/';

requests.miInit = {
    method: '',
    crossDomain: true,
    headers: { "Content-Type": "application/json", "authorization": `Bearer ${localStorage.getItem("accessToken")}` },
    mode: 'cors',
    cache: 'default'
};

//Secure getID
requests.getID = async function (URL) {
    Request(URL, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
}

//Create User in DB
requests.createUser = async function (name, lastName, email, idToken) {
    requests.miInit.method = "POST";
    requests.miInit.headers["Content-Type"] = "application/json";
    console.log(name, lastName, email, idToken);

    requests.miInit.body = JSON.stringify({
        "nombre": name,
        "apellido": lastName,
        "correo": email,
        "idToken": idToken
    });
    fetch(requests.URL + 'create', requests.miInit)
        .then((res) => res.json())
        .then((myJson) => {
            console.log(myJson);
            return true;
        })
}

//Add Friend or send Friend Request
requests.addFriend = async function (idUsuarioSolicitud) {
    requests.miInit.method = "POST";
    requests.miInit.body = JSON.stringify({
        "idUsuario": parseInt(localStorage.getItem("id")),
        "idUsuarioSolicitud": idUsuarioSolicitud
    });
    return await fetch(requests.URL + 'addFriend', requests.miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Confirm Friend Request
requests.confirmRequest = async function (idUsuarioSolicitud) {
    requests.miInit.method = "PUT";
    requests.miInit.body = JSON.stringify({
        "idUsuario": parseInt(localStorage.getItem("id")),
        "idUsuarioSolicitud": idUsuarioSolicitud
    });
    return await fetch(requests.URL + 'confirmFriend', requests.miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}


//Get added Friends
requests.getFriends = async function () {
    requests.miInit.method = "GET";
    const id = parseInt(localStorage.getItem("id"));
    return await fetch(requests.URL + 'getFriends/' + id, requests.miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}


//Save Messages of a conversation between friends
requests.saveMessage = async function (idAmigo, msg) {
    requests.miInit.method = "POST";
    requests.miInit.body = JSON.stringify({
        "mensaje": msg
    });
    return await fetch(requests.URL + 'sendMessage/' + parseInt(localStorage.getItem("id")) + '/' + idAmigo, requests.miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Get All Messages of a conversation between friends
requests.getAllMessages = async function () {
    requests.miInit.method = "GET";
    return await fetch(requests.URL + 'getAllMessages/' + parseInt(localStorage.getItem("id")), requests.miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Get messages sended to other users
requests.getMessages = async function (idAmigo) {
    requests.miInit.method = "GET";
    return await fetch(requests.URL + 'getMessages/' + parseInt(localStorage.getItem("id")) + '/' + idAmigo, requests.miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}
// Search People By Name
requests.searchPeopleByName = async function (personName) {
    requests.miInit.method = "GET";
    return fetch(requests.URL + 'searchPeople/' + personName, requests.miInit)
        .then((res) => res.json())
        .then((myJson) => localStorage.setItem("people", myJson))
};

// Search People
requests.searchPeople = async function () {
    requests.miInit.method = "GET";
    return await fetch(requests.URL + 'searchPeople/', requests.miInit)
        .then((res) => res.json())
        .then((myJson) => localStorage.setItem("people", myJson))
};


//Get Friend Requests
requests.getRequests = async function () {
    requests.miInit.method = "GET";
    return await fetch(requests.URL + 'getRequests/' + parseInt(localStorage.getItem("id")), requests.miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Delete Friend Requests
requests.deleteRequests = async function (idAmigo) {
    requests.miInit.method = "DELETE";
    return await fetch(requests.URL + 'deleteRequests/' + idAmigo + '/' + parseInt(localStorage.getItem("id")), requests.miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Delete Friends
requests.deleteFriends = async function (idAmigo) {
    requests.miInit.method = "DELETE";
    return await fetch(requests.URL + 'deleteFriends/' + idAmigo + '/' + parseInt(localStorage.getItem("id")), requests.miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}


export default requests;