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
const { OPEN_DOOR, CLOSE_DOOR, PLAY_ALERT, STOP_ALERT } = require('./constants');

const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

var maxPersons = 10;
var totalPersons = 0;

app.use(bodyParser.json());

app.get('/', (req, resp) => {
  resp.send('<h1>Hello from OpenIO</h1>');
});

app.get('/api/', (req, resp) => {
  resp.send('Hello from OpenIO API')
})

app.post('/api/persons/max/', (req, resp) => {
  try {
    maxPersons = req.body.max_persons
    console.log(`Max persons modified to ${maxPersons}`)
    return resp.status(200).send({
      success: true,
      message: 'Max persons updated',
    })
  } catch {
    console.log(`Error ${500}`)
  }
})

app.post('/api/persons/detection/', (req, resp) => {
  try {
    console.log('Person passed')
    totalPersons += 1;
    if (totalPersons > maxPersons) {
      io.sockets.emit(CLOSE_DOOR, 'everyone');
      io.sockets.emit(PLAY_ALERT, 'everyone');
    } else if (totalPersons == maxPersons) {
      io.sockets.emit(CLOSE_DOOR, 'everyone');
    } else {
      io.sockets.emit(OPEN_DOOR, 'everyone');
      io.sockets.emit(STOP_ALERT, 'everyone');
    }

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
  console.log('arduino connected!');
  socket.on('join', () => {
    console.log('arduino joined!')
  })
})

http.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
