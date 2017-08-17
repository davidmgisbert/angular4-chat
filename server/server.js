const app = require('express')();
const cors = require('cors')
const server = require('http').Server(app);
const io = require('socket.io')(server);
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');

server.listen(4201);

app.use(cors());

app.get('/', function (req, res) {
  res.send('Server listening on port 4201');
});

app.get('/api/authenticate/:username/:password', function (req, res, next) {
  let username = req.params.username;
  let password = req.params.password;

  MongoClient.connect('mongodb://localhost:27017/angular4-chat', function (err, db) {
    assert.equal(null, err);

    db.collection('authentication').find({ username: username }, { _id: 0 }).toArray(function (err, doc) {
      assert.equal(null, err);
      assert.equal(1, doc.length);

      let isCorrect = bcrypt.compareSync(password, doc[0].password);

      res.send(isCorrect);
    });
  });

});

// app.get('/create/user/:id', function (req, res) {
//   let user = req.params.id;

//   let password = "mypassword";
//   let hash = bcrypt.hashSync(password, 10);

//   MongoClient.connect('mongodb://localhost:27017/angular4-chat', function (err, db) {
//     assert.equal(null, err);

//     db.collection('authentication').insertOne({
//       username: user,
//       password: hash
//     }, function (err, result) {
//       assert.equal(err, null);

//       console.log("Inserted a document");
//       res.send(true);
//     });
//   });
// });

let users = [];

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
