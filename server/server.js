const { log } = require("console");
const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

require('dotenv').config();
const app = express();

// parse JSON bodies
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "*",
    }
})

// simple HTTP endpoint to list currently connected users
app.get('/users', (req, res) => {
    try {
        const list = Object.values(users).map(u => ({ id: u.id, name: u.name, username: u.username, socketId: u.socketId }));
        res.json({ ok: true, users: list });
    } catch (e) {
        res.status(500).json({ ok: false, error: String(e) });
    }
});

// Proxy endpoint for server-side Grog calls to avoid exposing API key or CORS issues.
app.post('/grog', async (req, res) => {
    try {
        const apiUrl = process.env.SERVER_GROG_API_URL || 'https://api.groq.com/v1/responses';
        const apiKey = process.env.SERVER_GROG_API_KEY;
        if (!apiKey) return res.status(500).json({ ok: false, error: 'SERVER_GROG_API_KEY not set on server' });

        const resp = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(req.body || {}),
        });

        const text = await resp.text();
        // forward status and body
        res.status(resp.status).send(text);
    } catch (e) {
        res.status(500).json({ ok: false, error: String(e) });
    }
});

// simple HTTP endpoint to list rooms
app.get('/rooms', (req, res) => {
    try {
        const list = Object.entries(rooms).map(([id, v]) => ({ id, owner: v.owner, meta: v.meta }));
        res.json({ ok: true, rooms: list });
    } catch (e) {
        res.status(500).json({ ok: false, error: String(e) });
    }
});

// In-memory user registry: userId -> { id, name, username, socketId }
const users = {};
// rooms map: roomId -> { owner, meta }
const rooms = {};

io.on("connect", (socket) => {
    console.log(`socket ${socket.id} connected`);

    // register a user (from client) with their app user id
    socket.on('register', (user) => {
        try {
            if (user && user.id) {
                users[user.id] = { ...user, socketId: socket.id };
                socket.userId = user.id;
                console.log(`registered user ${user.id} -> socket ${socket.id}`);
                io.emit('users', Object.values(users));
            }
        } catch (e) {
            console.error('register error', e);
        }
    });

    // join a room (used for group chats)
    socket.on('join', (room) => {
        if (!room) return;
        socket.join(room);
        console.log(`socket ${socket.id} joined room ${room}`);
    });

    // create a short-lived room with an id
    socket.on('create_room', ({ roomId, meta }) => {
        if (!roomId) return;
        rooms[roomId] = { owner: socket.userId || null, meta };
        socket.join(roomId);
        socket.emit('room_created', { roomId });
        console.log(`room created ${roomId} by socket ${socket.id}`);
    });

    // join a room by id (returns not found if doesn't exist)
    socket.on('join_room', ({ roomId }) => {
        console.log(`join_room request from socket ${socket.id} for ${roomId}`);
        if (!roomId) return;
        if (rooms[roomId]) {
            socket.join(roomId);
            socket.emit('room_joined', { roomId });
            console.log(`socket ${socket.id} joined existing room ${roomId}`);
        } else {
            console.log(`room ${roomId} not found (join attempted by ${socket.id})`);
            socket.emit('room_not_found', { roomId });
        }
    });

    // private message to a specific userId
    socket.on('private_message', ({ to, message, from }) => {
        if (!to || !message) return;
        const recipient = users[to];
        const payload = { from: from || socket.userId || null, message };
        if (recipient && recipient.socketId) {
            io.to(recipient.socketId).emit('private_message', payload);
        }
        // also echo back to sender for local persistence
        socket.emit('private_message', payload);
    });

    // group message to a room
    socket.on('group_message', ({ room, message, from }) => {
        if (!room || !message) return;
        const payload = { from: from || socket.userId || null, room, message };
        io.to(room).emit('group_message', payload);
    });

    // add contact: notify the recipient that someone added them
    socket.on('add_contact', ({ to, fromUser }) => {
        if (!to || !fromUser) return;
        const recipient = users[to];
        if (recipient && recipient.socketId) {
            io.to(recipient.socketId).emit('contact_added', { from: fromUser });
        }
    });

    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} disconnected`);
        if (socket.userId) {
            delete users[socket.userId];
            io.emit('users', Object.values(users));
        }
    });
});

const PORT = 3000;
server.listen(PORT,"0.0.0.0",()=>{
console.log(`server is running on port ${PORT} `);
}
)