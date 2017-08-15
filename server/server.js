var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(4201);

app.get('/', function (req, res) {
  res.send('Server listening on port 4201');
});

var users = [];

io.on('connection', function (socket) {
  socket.on('user added', function (data) {
    users.push(data.user);
    data.users = users;

    socket.broadcast.emit('user added', data);
    socket.emit('user added', data);
  });

  socket.on('message', function (data) {
    socket.broadcast.emit('message', data);
    socket.emit('message', data);
  });

  socket.on('user disconnected', function (data) {
    users.splice(users.indexOf(data.user), 1);
    data.users = users;

    socket.broadcast.emit('user disconnected', data);
    socket.emit('user disconnected', data);
  });
});
