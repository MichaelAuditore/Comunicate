$(function onDocReady() {
    getRequests();
});

async function start(reqs) {
    const numeroSolicitudes = $("#margen");
    const solicitudes = $(".solicitudes");

    if (typeof reqs !== "string") {
        numeroSolicitudes.html(`<p>Tienes ${reqs.length} solicitud(es) de amistad</p><hr/>`);
        reqs.map((r) => {
            const solicitud = [
                `<div class="col-lg-4" id="margen3">
                    <img src="./images/perfil.png" id="perfil" alt="">
                </div>
                <div class="col-lg-4" id="margen3">
                    <p>${r.nombre} ${r.apellido}</p>
                </div>
                <div class="col-lg-4" id="margen3">
                    <form>
                        <button type="submit" class="btn btn-primary" onsubmit="confirmFriendRequest(${id})">Aceptar</button>
                        <button type="submit" class="btn btn-danger" onsubmit="deleteFriendRequest(${id})">Rechazar</button>
                    </form>
                </div>`
            ];
            solicitudes.append(solicitud.join(''));
        })
    } else {
        numeroSolicitudes.html("<p>No tienes solicitudes</p><hr/>");
        console.log("No hay requests");
    }
}

async function confirmFriendRequest(id) {
    const parsedId = parseInt(id);
    confirmRequest(parsedId);
    getRequests();
}


async function deleteFriendRequest(id) {
    const parsedId = parseInt(id);
    deleteRequests(parsedId);
    getRequests();
}