/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
var Session = window.Session || {};


(function rideScopeWrapper($) {

    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = 'index.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = 'index.html';
    });

    // Register click handler for #request button
    $(function onDocReady() {
        getFriends();
        $("#home").click(goHome);
        $("#searchMessages").click(goMessages);
        $("#searchRequests").click(goRequests);
        $("#searchPeople").submit(goPeople);
        var poolData = {
            UserPoolId: _config.cognito.userPoolId,
            ClientId: _config.cognito.userPoolClientId
        };

        userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        Session = userPool.getCurrentUser();

        localStorage.setItem("sub", Session.username);

        getID();

        const t_id = localStorage.getItem("id") || null;

        if (t_id !== null && t_id !== "abcd" && t_id !== "undefined") {
            console.log("Registered Correctly");
        } else {
            if (updateID()) {
                getID();
            }
            if (localStorage.getItem("id")) {
                console.log(localStorage.getItem("id"));
            } else {
                window.location.reload();
            }
        }

        $('#signOut').click(function () {
            WildRydes.signOut();
            alert("You have been signed out.");
            localStorage.clear();
            window.location = "index.html";
        });

        WildRydes.authToken.then(function updateAuthMessage(token) {
            if (token) {
                localStorage.setItem("sub", Session.username)
                localStorage.setItem("idToken", token);
                console.log('You are authenticated');
            }
        });

    });
}(jQuery));