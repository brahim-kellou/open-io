const { Board, Pin } = require("johnny-five");
const WebSocket = require('ws');

//var board = new Board();

var board = new Board({
    repl: false,
});

var socket = null;


board.on("ready", function () {
    try {
        socket = new WebSocket("ws://192.168.78.78:3000");
    } catch (exception) {
        console.error(exception);
    }
    socket.onerror = function (error) {
        console.error(error);
    };

    socket.onopen = function (event) {
        console.log("Connexion établie.");

        // Lorsque la connexion se termine.
        this.onclose = function (event) {
            console.log("Connexion terminé.");
        };

        // Lorsque le serveur envoi un message.
        this.onmessage = function (event) {
            console.log("Message:", event.data);
        };

        //read from A0
        var pin = new Pin("A0");
        var presence = true;

        // Envoi d'un message vers le serveur.
        pin.read(function (error, value) {
            if (value < 500 && !presence) {
                this.send("person detected");
                presence = true;
            } else if (value >= 500) {
                presence = false;
            }
        });
    };
});
