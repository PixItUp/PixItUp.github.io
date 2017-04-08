// @flow
const express = require('express');
const http = require('http');

var app = express();
var httpServer: express.Server = http.createServer(app);
var io = require('socket.io')(httpServer);

app.get('/', function(req, res){
  // res.send('<p>page</p>');
 // res.sendFile(__dirname + '/../dist/index.html');
 res.sendFile(__dirname + '/dist/index.html');

});

app.get('/bundle.js', function(req, res){
  res.sendFile(__dirname + '/dist/bundle.js');
})

const users: Set<String> = new Set();

io.on('connection', function(socket){
  var name = null;
  console.log('a user connected');
  socket.on('disconnect', () => {
    if (name){
      console.log(name + " disconnected");
    }
    console.log('a user disconnected');
  })
  socket.on('name', function(message){
    name = message;
    console.log(message);
  })
});

httpServer.listen(8000, function(){
  console.log('listening on *:3000');
});
