const { SOCKET_HOST } = require("./config")
const { Board, Led, Servo, Piezo } = require('johnny-five');
const io = require('socket.io-client')
const socket = io(SOCKET_HOST, { path: '/socket' })
const { OPEN_DOOR, CLOSE_DOOR, PLAY_ALERT, STOP_ALERT } = require('./constants');

let redLed, greenLed, servo, piezo;
let init = false;
let initAction = [];
const actions = {
  OPEN_DOOR: () => openDoor(),
  CLOSE_DOOR: () => closeDoor(),
  PLAY_ALERT: () => playAlert(),
  STOP_ALERT: () => stopAlert()
}

let board = new Board({
  repl: false,
});

board.on('ready', function () {
  redLed = new Led(4);
  greenLed = new Led(5);
  servo = new Servo(9);
  piezo = new Piezo(2);
  console.log(init)
  console.log(initAction)
  if (init) {
    for (let i = 0; i < initAction.length; i++) {
      let key = initAction[i];
      if (key in actions) {
        actions[key]();
      }
    }
    init = false;
    initAction = []
  }
});

socket.on(OPEN_DOOR, () => {
  if (board.isReady) {
    openDoor();
  } else {
    init = true;
    initAction.push(OPEN_DOOR);
  }
})

socket.on(CLOSE_DOOR, () => {
  if (board.isReady) {
    closeDoor();
  } else {
    init = true;
    initAction.push(CLOSE_DOOR);
  }
})

socket.on(PLAY_ALERT, () => {
  if (board.isReady) {
    playAlert();
  } else {
    init = true;
    initAction.push(PLAY_ALERT);
  }
})

socket.on(STOP_ALERT, () => {
  if (board.isReady) {
    stopAlert();
  } else {
    init = true;
    initAction.push(STOP_ALERT);
  }
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
