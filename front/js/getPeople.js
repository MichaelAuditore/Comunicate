$(function onDocReady() {
    const name = getParameterByName("personName");
    if (name === "") {
        searchPeople();
    } else {
        searchPeopleByName(name);
    }
});

function paintPeople(people) {
    const numeroSolicitudes = $("#margen");

    if (typeof people !== "string") {
        people.map((r) => {
            const persona = [
                `<div class="row p0">
                <div class="col-lg-4" id="margen3">
                    <img src="./images/perfil.png" id="perfil" alt="">
                </div>
                <div class="col-lg-4" id="margen3">
                    <p>${r.nombre} ${r.apellido}</p>
                </div>
                <div class="col-lg-4" id="margen3">
                    <button type="submit" class="btn btn-primary" onclick="sendFriendRequest(${id})">Enviar Solicitud</button>
                </div>
                </div>
                `
            ];
            numeroSolicitudes.append(persona.join(''));
        })
    } else {
        numeroSolicitudes.html("<p>No hemos podido encontrar a nadie</p><hr/>");
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function sendFriendRequest(id) {
    const parseId = parseInt(id);
    addFriend(parseId);
}