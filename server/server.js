const http = require("http");
const Server = require("socket.io");
const httpServer = http.createServer();
const io = new Server.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});
const PORT = 3666;
let usersConnected = 0;

let serverHB = 0;
setInterval(() => {
    io.emit("action", { type: 'heartbeat', payload: { serverHB: serverHB, alert: Math.floor(Math.random() * 8) + 1 } });
    serverHB++;
}, 150);

io.on("connection", (socket) => {
    if (usersConnected === 0) {
        io.emit("action", { type: 'progMaster', payload: true });
    } else {
        usersConnected++;
    }

    console.log(`User Connected: ${usersConnected} users online.`);
    io.emit("action", { type: 'userCount', payload: usersConnected });

    socket.on('progUpdate', (data) => {
        io.emit("action", { type: 'updateProgress', payload: data.value });
    });

    socket.on('disconnect', (data) => {
        usersConnected--;
        io.emit("action", { type: 'userCount', payload: usersConnected });
        console.log(`User Disconnected: ${usersConnected} users online.`);
    });
});

httpServer.listen(PORT);
console.log(`Socket Server Running on Port:${PORT}`);

