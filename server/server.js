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

let usersConnected = 0; //Current count of users online
let serverHB = 0; //Heart Beat count.

//Start the heart beat. One each heartbeat the server will emit a payload that tells client which box to highlight.
setInterval(() => {
    io.emit("action", { type: 'heartbeat', payload: { serverHB: serverHB, alert: Math.floor(Math.random() * 8) + 1 } });
    serverHB++;
}, 150);

//Listen to Socket messages here.
io.on("connection", (socket) => {
    if (usersConnected === 0) {
        io.emit("action", { type: 'progMaster', payload: true }); //First user connected is given a slider bar to interact with.
    }
    usersConnected++;
    console.log(`User Connected: ${usersConnected} users online.`);

    io.emit("action", { type: 'userCount', payload: usersConnected });

    socket.on('progUpdate', (data) => {
        io.emit("action", { type: 'updateProgress', payload: data.value });
    });

    socket.on('disconnect', (data) => {
        io.emit("action", { type: 'userCount', payload: usersConnected });
        usersConnected--;
        console.log(`User Disconnected: ${usersConnected} users online.`);
    });
});

httpServer.listen(PORT);
console.log(`Socket Server Running on Port:${PORT}`);

