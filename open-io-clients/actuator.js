const { Board, Led, Servo, Piezo } = require("johnny-five");
const WebSocket = require('ws');

//var board = new Board();

var redLed, greenLed, servo, piezo;
var board = new Board({
  repl: false,
});

function open_door() {
  redLed.off();
  greenLed.on();
  servo.to(180);
}

function close_door() {
  redLed.on();
  greenLed.off();
  servo.to(0);
}

function play_alarm() {
  piezo.tone(1000, 99 * 10000);
}

function pause_alarm() {
  piezo.off()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

board.on("ready", function () {
  redLed = new Led(4);
  greenLed = new Led(5);
  servo = new Servo(9);
  piezo = new Piezo(2);

  var socket = null;

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
      open_door();
    };
  };
});
