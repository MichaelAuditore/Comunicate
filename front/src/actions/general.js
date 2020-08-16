export const showModal = function (msg) {
    const modal = document.getElementById("modal-close");
    const sms = document.getElementById("text-tag");
    sms.innerHTML = msg;
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.display = "none";
    }, 5000);
}