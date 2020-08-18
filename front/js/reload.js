function goHome(event) {
    event.preventDefault();
    window.location.href = `home.html`;
}

function goMessages(event) {
    event.preventDefault();
    window.location.href = "chats.html";
}

function goRequests(event) {
    event.preventDefault();
    window.location.href = "requests.html";
}

function goPeople(event) {
    const personName = $("#personName").val();
    event.preventDefault();
    window.location.href = `people.html?personName=${personName}`;
}