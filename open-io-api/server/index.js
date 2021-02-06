const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const bodyParser = require('body-parser');
const apiRoutes = require('./api');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', apiRoutes)
app.get('/', (req, resp) => {
  resp.send('<h1>API pour OpenIO</h1>');
});

http.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
