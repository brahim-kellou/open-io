const { Board, Pin } = require("johnny-five");
const fetch = require('node-fetch');

url = 'http://192.168.78.78/api'


 var board = new Board({
     repl: false,
 });


 board.on("ready", function () {
    // read from A0
     var pin = new Pin("A0");
     var presence = false;

     // Envoi d'un message vers le serveur.
     pin.read(function (error, value) {
         if (value < 400 && !presence) {
             console.log("person detected")
             fetch(url, {
                 method: 'POST',
                 headers: {
                     'Content-type': 'application/json'
                 }
             }).then(resp => resp.json())
                 .then(resp => console.log(resp))

             presence = true;
         } else if (value >= 400) {
             presence = false;
         }
     });
 });
