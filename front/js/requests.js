var sub = localStorage.getItem("sub");
const accessToken = localStorage.getItem("idToken");
let id = localStorage.getItem("id");
var email = localStorage.getItem("email");

const URL = "apil.us-east-1.elasticbeanstalk.com/api/";

const miInit = {
    method: '',
    crossDomain: true,
    headers: { "Content-Type": "application/json", "authorization": `Bearer ${accessToken}` },
    mode: 'cors',
    cache: 'default'
};


//Secure getID
async function getID() {
    miInit.method = "GET";
    const urlLink = `${_config.api.invokeUrl}login/${sub}`;
    await fetch(urlLink, miInit)
        .then(resp => resp.json())
        .then(resp => localStorage.setItem("id", resp[0].id));
}

//Create User in DB
async function createUser(name, lastName, email) {
    miInit.method = "POST";

    miInit.body = JSON.stringify({
        "nombre": name,
        "apellido": lastName,
        "correo": email,
        "idToken": sub || "abcd"
    });
    console.log(miInit);

    const urlLink = `${_config.api.invokeUrl}create/`;
    fetch(urlLink, miInit)
        .then((res) => res.json())
        .then((myJson) => {
            console.log(myJson);
            return true;
        }).catch(err => { return false; });
}

//Update ID
async function updateID() {
    miInit.method = "PUT";
    miInit.body = JSON.stringify({ "correo": email, "idToken": sub });
    const urlLink = `${_config.api.invokeUrl}update`;
    fetch(urlLink, miInit)
        .then(resp => resp.json())
        .then(resp => getID());
}

//Add Friend or send Friend Request
async function addFriend(idUsuarioSolicitud) {
    miInit.method = "POST";
    miInit.body = JSON.stringify({
        "idUsuario": id,
        "idUsuarioSolicitud": idUsuarioSolicitud
    });
    const urlLink = `${_config.api.invokeUrl}addFriend/`;
    fetch(urlLink, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Confirm Friend Request
async function confirmRequest(idUsuarioSolicitud) {
    miInit.method = "PUT";
    miInit.body = JSON.stringify({
        "idUsuario": id,
        "idUsuarioSolicitud": idUsuarioSolicitud
    });
    console.log(miInit.body);
    const urlLink = `${_config.api.invokeUrl}confirmFriend/`;
    fetch(urlLink, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}


//Get added Friends
async function getFriends() {
    miInit.method = "GET";
    const urlLink = `${_config.api.invokeUrl}getFriends/${id}`;
    fetch(urlLink, miInit)
        .then((res) => res.json())
        .then((myJson) => paintFriends(myJson))
}


//Save Messages of a conversation between friends
async function saveMessage(idAmigo, msg) {
    miInit.method = "POST";
    miInit.body = JSON.stringify({
        "mensaje": msg
    });
    const urlLink = `${_config.api.invokeUrl}sendMessage/${id}/${idAmigo}`;
    fetch(urlLink, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Get All Messages of a conversation between friends
async function getAllMessages() {
    miInit.method = "GET";
    const urlLink = `${_config.api.invokeUrl}getAllMessages/${id}`;
    fetch(urlLink, miInit)
        .then((res) => res.json())
        .then((myJson) => paintChats(myJson))
}

//Get messages sended to other users
async function getMessages(idAmigo) {
    miInit.method = "GET";
    const urlLink = `${_config.api.invokeUrl}getMessages/${id}/${idAmigo}`;
    fetch(urlLink, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

// Search People By Name
async function searchPeopleByName(personName) {
    miInit.method = "GET";
    const urlLink = `${_config.api.invokeUrl}searchPeople/${personName}`;
    fetch(urlLink, miInit)
        .then((res) => res.json())
        .then((myJson) => console.log(myJson))
};

// Search People
async function searchPeople() {
    miInit.method = "GET";
    const urlLink = `${_config.api.invokeUrl}searchPeople/${id}`;
    fetch(urlLink, miInit)
        .then((res) => res.json())
        .then((myJson) => paintPeople(myJson));
};


//Get Friend Requests
async function getRequests() {
    miInit.method = "GET";
    const urlLink = `${_config.api.invokeUrl}getRequests/${id}`;
    await fetch(urlLink, miInit)
        .then((res) => res.json())
        .then((myJson) => start(myJson))
}

//Delete Friend Requests
async function deleteRequests(idAmigo) {
    miInit.method = "DELETE";
    const urlLink = `${_config.api.invokeUrl}deleteRequests/${idAmigo}/${id}`;
    fetch(urlLink, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}

//Delete Friends
async function deleteFriends(idAmigo) {
    miInit.method = "DELETE";
    const urlLink = `${_config.api.invokeUrl}deleteFriends/${idAmigo}/${id}`;
    fetch(urlLink, miInit)
        .then((res) => res.json())
        .then((myJson) => myJson)
}
