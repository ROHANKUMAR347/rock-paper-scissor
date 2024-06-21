const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const players = {};
const games = {};

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on("join", (username) => {
    players[socket.id] = { id: socket.id, username, score: 0, move: null };
    io.emit("updatePlayers", Object.values(players));
    console.log(`Player joined: ${username}`);
  });

  socket.on("play", (opponentId) => {
    const player1 = players[socket.id];
    const player2 = players[opponentId];
    if (player1 && player2) {
      games[socket.id] = opponentId;
      games[opponentId] = socket.id;
      io.to(socket.id).emit("startGame", player2);
      io.to(opponentId).emit("startGame", player1);
      console.log(
        `Game started between ${player1.username} and ${player2.username}`
      );
    }
  });

  socket.on("makeMove", ({ move }) => {
    const opponentId = games[socket.id];
    const player1 = players[socket.id];
    const player2 = players[opponentId];

    player1.move = move;

    if (player1.move && player2.move) {
      const result = determineWinner(player1, player2);
      io.to(socket.id).emit("result", result);
      io.to(opponentId).emit("result", result);
      player1.move = null;
      player2.move = null;
      io.emit("updatePlayers", Object.values(players));
    }
  });

  socket.on("disconnect", () => {
    const opponentId = games[socket.id];
    if (opponentId) {
      io.to(opponentId).emit("opponentDisconnected");
    }
    delete players[socket.id];
    delete games[socket.id];
    delete games[opponentId];
    io.emit("updatePlayers", Object.values(players));
    console.log(`Player disconnected: ${socket.id}`);
  });
});

const determineWinner = (player1, player2) => {
  const moves = { rock: "scissors", scissors: "paper", paper: "rock" };
  let result;
  if (player1.move === player2.move) {
    result = "draw";
  } else if (moves[player1.move] === player2.move) {
    player1.score += 1;
    result = "win";
  } else {
    player2.score += 1;
    result = "lose";
  }
  return { player1, player2, result };
};

server.listen(5000, () => console.log("Server listening on port 5000"));
