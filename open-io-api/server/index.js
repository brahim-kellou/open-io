const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  path: '/socket'
});
const {
  OPEN_DOOR,
  CLOSE_DOOR,
  PLAY_ALERT,
  STOP_ALERT,
  MAX_PERSONS,
  GET_TOTAL_PERSONS,
  TOTAL_PERSONS
} = require('./constants');

const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

let maxPersons = 10;

app.use(bodyParser.json());

app.get('/', (req, resp) => {
  resp.send('<h1>Hello from OpenIO</h1>');
});

app.get('/api/', (req, resp) => {
  resp.send('Hello from OpenIO API')
})

app.post('/api/persons/detection/', (req, resp) => {
  try {
    console.log('Person detected')
    io.sockets.emit('GET_TOTAL_PERSONS', 'everyone')
    return resp.status(200).send({
      success: true,
      message: 'well received',
    })
  } catch {
    console.log(`Error ${500}`)
  }
})

// socket listners
io.on('connection', (socket) => {
  console.log('New device connected');

  io.sockets.emit(GET_TOTAL_PERSONS, 'everyone')

  socket.on(TOTAL_PERSONS, (totalPersons) => {
    if (totalPersons < maxPersons) {
      io.sockets.emit(OPEN_DOOR, 'everyone');
      io.sockets.emit(STOP_ALERT, 'everyone');
    } else if (totalPersons == maxPersons) {
      io.sockets.emit(CLOSE_DOOR, 'everyone');
      io.sockets.emit(STOP_ALERT, 'everyone');
    } else {
      io.sockets.emit(CLOSE_DOOR, 'everyone');
      io.sockets.emit(PLAY_ALERT, 'everyone');
    }
  });

  socket.on(MAX_PERSONS, (max) => {
    maxPersons = max
    console.log('Max persons updated to ' + maxPersons)
    socket.emit(GET_TOTAL_PERSONS, 'everyone');
  });
})

http.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
