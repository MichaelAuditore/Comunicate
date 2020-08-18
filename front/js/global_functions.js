function paintFriends(friends) {
    const friendList = $(".friends");

    if (typeof friends !== "string") {
        friends.map((f) => {
            const friendDiv = [
                `<div class="friend">
                    <p>${f.nombre} ${f.apellido}</p> <button type="submit" onsubmit="deleteFriend(${f.id})">×</span>
                 </div>`
            ];
            friendList.append(friendDiv.join(""));
        });

    } else {
        friendList.html("<p>No tienes amigos agregados al momento</p>")
    }
}