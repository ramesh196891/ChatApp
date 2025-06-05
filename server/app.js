import express from 'express';
import { config } from 'dotenv';
import { createServer } from "http";
import { Server } from "socket.io";

config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "http://localhost:5173" }
});



let playerScore = [];

io.on("connection", (socket) => {
    
    socket.on("scores", (score) => {
        playerScore.push({...score, id: socket.id});

        socket.emit("playerScores", playerScore);

        setInterval(() => {
            socket.emit("playerScores", playerScore);
        }, 5000);
    });
});


httpServer.listen(3000, () => {});