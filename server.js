const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Sert les fichiers depuis le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gestion WebSocket
io.on('connection', socket => {
  console.log('✅ Un utilisateur est connecté');

  socket.on('chat message', msg => {
    socket.broadcast.emit('chat message', msg); // Diffuse aux autres
  });

  socket.on('disconnect', () => {
    console.log('❌ Un utilisateur s’est déconnecté');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
