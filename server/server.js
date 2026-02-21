const { log } = require("console");
const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "*",
    }
})

io.on("connect", (socket) => {
    console.log(`user ${socket.id} connected`);


    socket.on("message", (msg) =>{
        console.log(msg);
        socket.broadcast.emit("response",msg)
        
    })
    
    socket.on("disconnect", (socket)=> {
        console.log(`user ${socket.id} disconnected`);
        
    })
})

const PORT = 3000;
server.listen(PORT,"0.0.0.0",()=>{
console.log(`server is running on port ${PORT} `);
}
)