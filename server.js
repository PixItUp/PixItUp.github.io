// @flow
const express = require('express');
const http = require('http');
const clientManager = require('./src/server/clientManager');

var app = express();
var httpServer: express.Server = http.createServer(app);
var io:http.Server = require('socket.io')(httpServer);

app.get('/', function(req, res){
  // res.send('<p>page</p>');
 // res.sendFile(__dirname + '/../dist/index.html');
 res.sendFile(__dirname + '/dist/index.html');

});

app.get('/bundle.js', function(req, res){
  res.sendFile(__dirname + '/dist/bundle.js');
})

clientManager.setup(io);

httpServer.listen(8000, function(){
  console.log('listening on *:3000');
});
