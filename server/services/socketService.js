const { Server } = require("socket.io");

let rooms = {};
let playerSockets = {};
let leavedPlayers = [];

module.exports = function socketConnection(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("socket connected", socket.id);
    socket.on("initialize-game", ({ gameCode, quizData }) => {
      rooms[gameCode] = {
        host: socket.id,
        players: {},
        quizData,
        currentQuestion: 0,
        timer: null,
        answers: 0,
        isStarted: false,
      };

      socket.join(gameCode);
      const socketId = socket.id;
      socket.emit("game-initialized", { socketId });
    });

    socket.on(
      "join-game",
      ({ gameCode, username = null, prevSocketId = null }) => {
        if (rooms[gameCode]) {
          let player;
          if (prevSocketId) {
            player = leavedPlayers.find((p) => p.id === prevSocketId);
            leavedPlayers = leavedPlayers.filter((p) => p.id !== prevSocketId);
          }

          if (player) {
            rooms[gameCode].players[socket.id] = {
              ...player,
              id: socket.id,
            };
            playerSockets[socket.id] = socket.id;
          } else if (!prevSocketId && username) {
            rooms[gameCode].players[socket.id] = {
              user: username,
              id: socket.id,
              score: 0,
            };
            playerSockets[socket.id] = socket.id;
          } else {
            rooms[gameCode].host = socket.id;
          }

          socket.join(gameCode);
          io.to(gameCode).emit("player-joined", rooms[gameCode].players);
          socket.emit("joined-data", socket.id);
        } else {
          socket.emit("error", "Game not found!");
        }
      }
    );

    socket.on("get-players", ({ gameCode }) => {
      if (rooms[gameCode]) {
        socket.emit("send-players", rooms[gameCode].players);
      }
    });

    socket.on("start-game", ({ gameCode }) => {
      let room = rooms[gameCode];
      if (room.isStarted) {
        return;
      }

      room.isStarted = true;

      if (room && room.host === socket.id) {
        io.to(gameCode).emit("game-started");
        room.currentQuestion = 0;
        sendQuestion(gameCode);
      }
    });

    function sendQuestion(gameCode) {
      let room = rooms[gameCode];

      if (!room || room.currentQuestion === room.quizData.questions.length) {
        clearTimeout(room.timer);

        io.to(gameCode).emit("game-over", room.players);
        return;
      }

      for (const player of Object.values(room.players)) {
        player.isAnswered = false;
      }
      room.answers = 0;

      let currentQuestion = room.quizData.questions[room.currentQuestion];

      if (room.timer) {
        clearTimeout(room.timer);
      }

      const questionSendTime = Date.now();
      console.log(rooms[gameCode].players);
      io.to(gameCode).emit("next-question", {
        currentQuestion,
        questionSendTime,
      });

      const questionTimeMs = currentQuestion.time * 1000; //S -> MS

      room.timer = setTimeout(() => {
        room.currentQuestion++;
        sendQuestion(gameCode);
      }, questionTimeMs);
    }

    socket.on("current-question", (gameCode) => {
      let room = rooms[gameCode];

      if (room) {
        const question = room.quizData.questions[room.currentQuestion];
        const questionSendTime = Date.now();
        socket.emit("next-question", {
          currentQuestion: question,
          questionSendTime,
        });
      }
    });

    socket.on("answer", ({ gameCode, answer }) => {
      let room = rooms[gameCode];

      if (room) {
        const currentQuestion = room.quizData.questions[room.currentQuestion];
        if (currentQuestion) {
          const correctAnswer = currentQuestion.answers.find(
            (answer) => answer.is_correct === true
          ).answer;

          if (room.players[socket.id].isAnswered) {
            return;
          }

          if (answer.answer === correctAnswer) {
            room.players[socket.id].score += currentQuestion.maxPoints;
          }

          //////

          room.players[socket.id].isAnswered = true;
          room.answers += 1;

          ////

          io.to(socket.id).emit("answer-feedback", {
            correct: answer.answer === correctAnswer,
            points: currentQuestion.maxPoints,
            answers: room.answers,
          });

          io.to(room.host).emit("stats", {
            answers: room.answers,
          });
        }
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(reason);
      let gameCode = null;
      for (const code in rooms) {
        if (rooms[code].players[socket.id] || rooms[code].host === socket.id) {
          gameCode = code;
          break;
        }
      }

      if (!gameCode) return;

      const room = rooms[gameCode];
      let leavingPlayer;

      if (room.players[socket.id]) {
        leavingPlayer = room.players[socket.id];
        leavedPlayers.push(leavingPlayer);

        delete room.players[socket.id];
        delete playerSockets[socket.id];
      }

      io.to(gameCode).emit("player-left", {
        leftPlayer: leavingPlayer,
        players: room.players,
      });
    });

    socket.on("kick", ({ playerId }) => {
      let gameCode = null;
      for (const code in rooms) {
        if (rooms[code].players[playerId]) {
          gameCode = code;
          break;
        }
      }

      if (!gameCode) return;

      const room = rooms[gameCode];
      const player = room.players[playerId];

      delete room.players[playerId];

      socket.emit("player-kicked", {
        leftPlayer: player,
      });

      const playerSocketId = playerSockets[playerId];
      if (playerSocketId) {
        io.to(playerSocketId).emit("kicked", { player });

        const clientSocket = io.sockets.sockets.get(playerSocketId);
        if (clientSocket) {
          clientSocket.disconnect(true);
        }

        if (playerSockets[playerId]) {
          delete playerSockets[playerId];
        }
      }
    });

    socket.on("terminate", ({ gameCode }) => {
      if (rooms[gameCode]) {
        for (const playerId in rooms[gameCode].players) {
          const clientSocket = io.sockets.sockets.get(playerSockets[playerId]);
          if (clientSocket) {
            clientSocket.emit("game-terminated", rooms[gameCode].players);
            clientSocket.disconnect(true);
          }
        }
        socket.emit("game-terminated");

        socket.disconnect(true);
        delete rooms[gameCode];
      }
    });
  });

  return io;
};
