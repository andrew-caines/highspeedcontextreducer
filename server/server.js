const io = require("socket.io");
const PORT = 3666;
const server = io.listen(PORT);
let usersConnected = 0;

let serverHB = 0;
setInterval(() => {
    server.emit("action", { type: 'heartbeat', payload: { serverHB: serverHB, alert: Math.floor(Math.random() * 8) + 1 } });
    serverHB++;
}, 10);

server.on("connection", (socket) => {
    if (usersConnected === 0) {
        server.emit("action", { type: 'progMaster', payload: true });
    }
    usersConnected++;
    console.log(`User Connected: ${usersConnected} users online.`);
    server.emit("action", { type: 'userCount', payload: usersConnected });

    socket.on('progUpdate', (data) => {
        server.emit("action", { type: 'updateProgress', payload: data.value });
    });

    socket.on('disconnect', (data) => {
        usersConnected--;
        server.emit("action", { type: 'userCount', payload: usersConnected });
        console.log(`User Disconnected: ${usersConnected} users online.`);
    });
});
console.log(`Socket Server Running on Port:${PORT}`);

