const { PROD_API_ENDPOINT } = require("./config")
const { Board, Pin } = require("johnny-five");
const fetch = require('node-fetch');

const minLight = 400;
const apiPath = "/api/persons/detection/"
const apiUrl = PROD_API_ENDPOINT + apiPath

let board = new Board({
  repl: false,
  port: "COM7"
});

board.on("ready", function () {
  // read from A0
  let pin = new Pin({
    pin: "A0",
    board: board
  });
  let presence = false;

  // when person detected, notify the server
  pin.read(function (error, value) {
    if (value < minLight && !presence) {
      presence = true;
    } else if (value >= minLight && presence) {
      console.log("person detected")
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
      presence = false;
    }
  });
});
