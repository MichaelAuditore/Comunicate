$(function onDocReady() {
    getAllMessages();
});

function paintChats(chats) {
    const numeroSolicitudes = $("#margen");
    const solicitudes = $(".solicitudes");

    if (typeof chats !== "string") {
        numeroSolicitudes.html(`<p>Tienes ${chats.length} chat(s) de amistad</p><hr/>`);
        chats.map((r) => {
            const solicitud = [
                `<div class="row p0">
                <div class="col-lg-4" id="margen3">
                    <img src="./images/perfil.png" id="perfil" alt="">
                </div>
                <div class="col-lg-4" id="margen3">
                    <p>${r.nombre} ${r.apellido}</p>
                </div>
                <div class="col-lg-4" id="margen3">
                    <button type="submit" class="btn btn-primary" onclick="openChat(${id})">Abrir Chat</button>
                </div>
                </div>`
            ];
            solicitudes.append(solicitud.join(''));
        })
    } else {
        numeroSolicitudes.html("<p>No tienes chats</p><hr/>");
    }
}

function openChat(id) {
    const parseId = parseInt(id);
}