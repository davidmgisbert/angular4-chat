var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(4201);

app.get('/', function (req, res) {
  res.send('Server listening on port 4201');
});

io.on('connection', function (socket) {
  socket.on('user added', function (data) {
    socket.emit('user added', data);
  });
});
