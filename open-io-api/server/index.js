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

const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, resp) => {
  resp.send('<h1>API pour OpenIO</h1>');
});
app.get('/api', (req, resp) => {
  resp.send('Hello from OpenIO API')
})
app.post('/api', (req, resp) => {
  try {
    console.log('person detected!')
    io.sockets.emit('open-door', 'everyone');
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
