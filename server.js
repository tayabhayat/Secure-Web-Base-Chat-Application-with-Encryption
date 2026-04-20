const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log("User connected");

  socket.on('sendMessage', (encryptedMsg) => {
    // Server ONLY sees encrypted message
    console.log("Encrypted on server:", encryptedMsg);

    socket.broadcast.emit('receiveMessage', encryptedMsg);
  });
});

server.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});