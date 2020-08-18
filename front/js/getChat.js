$(function onDocReady() {
    const id = getParameterByName("idUsuario");
    getMessages(id);
});

function paintMessages(sms) {
    const numeroSolicitudes = $("#margen");

    if (typeof sms !== "string") {
        sms.map((msg) => {
            const m = [
                `<div class="row p0">
                    <div class="friend"><p>${msg.mensaje}</p></div>
                </div>
                `
            ];
            numeroSolicitudes.append(m.join(''));
        })
    } else {
        numeroSolicitudes.html("<p>No hemos podido encontrar ningun mensaje de esta conversaión/p><hr/>");
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}