import express from 'express';
import { config } from 'dotenv';
import { createServer } from "http";
import { Server } from "socket.io";

config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "https://chat-app-eight-omega-74.vercel.app" }
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


app.get("/api/s", (req, res) => {
    res.json({"prakash"});
});


httpServer.listen(3000, () => {});
