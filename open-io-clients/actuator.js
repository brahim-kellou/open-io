const {SOCKET_HOST} = require("./config")
const { Board, Led, Servo, Piezo } = require('johnny-five');
const io = require('socket.io-client')
const socket = io(SOCKET_HOST, {
  path: '/socket'
})
const {OPEN_DOOR, CLOSE_DOOR, PLAY_ALARM, STOP_ALARM} = require('./constants');

var redLed, greenLed, servo, piezo;

var board = new Board({
  repl: false,
});

board.on('ready', function () {
  redLed = new Led(4);
  greenLed = new Led(5);
  servo = new Servo(9);
  piezo = new Piezo(2);

});

socket.on(OPEN_DOOR, () => {
  openDoor();
})

socket.on(CLOSE_DOOR, () => {
  closeDoor();
})

socket.on(PLAY_ALARM, () => {
  playAlert();
})

socket.on(STOP_ALARM, () => {
  stopAlert();
})


function openDoor() {
  redLed.off();
  greenLed.on();
  servo.to(180);
}

function closeDoor() {
  redLed.on();
  greenLed.off();
  servo.to(0);
}

function playAlert() {
  piezo.tone(1000, 99 * 10000);
}

function stopAlert() {
  piezo.off()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


