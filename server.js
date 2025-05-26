const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Un utilisateur connecté');

  socket.on('chat message', (msg) => {
    console.log('Message reçu : ' + msg);
    io.emit('chat message', msg); // renvoyer à tous les clients
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

server.listen(3000, () => {
  console.log('Serveur en écoute sur http://localhost:3000');
});
