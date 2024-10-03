import http from "http";
import Server from "socket.io";
const httpServer = http.createServer();
const io = new Server.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

//MARK: Constants
const PORT = 3666;
const SERVER_HEARTBEAT_DELAY = 100; //This is the ms delay between heart beats
let usersConnected = 0; //Current count of users online
//MARK: Globals
let serverHB = 0; //Heart Beat count.

//MARK: Types
type HeartbeatPayload = {
    serverHB: number,
    alert: number
};

type ProgramMaster = true;
type ProgramUpdate = {
    value: number
};

enum MessageType {
    usercount = 'userCount',
    heartbeat = 'heartbeat',
    updateProgressBar = 'updateProgress',
    programMaster = 'progMaster',
    programUpdate = 'progUpdate',
    disconnect = 'disconnect',
};
interface Action<T> {
    type: MessageType,
    payload: T
}

type PayloadMap = {
    [MessageType.usercount]: number,
    [MessageType.heartbeat]: HeartbeatPayload,
    [MessageType.programMaster]: ProgramMaster,
    [MessageType.programUpdate]: ProgramUpdate,
    [MessageType.updateProgressBar]: number,
    [MessageType.disconnect]: undefined
};

//MARK: Functions & Handlers
function emitAction<T extends MessageType>(type: T, payload: PayloadMap[T]) {
    io.emit("action", { type, payload });
}

//Start the heart beat. One each heartbeat the server will emit a payload that tells client which box to highlight.
setInterval(() => {
    emitAction(MessageType.heartbeat, { serverHB: serverHB, alert: Math.floor(Math.random() * 8) + 1 });
    serverHB++;
}, 150);

//Listen to Socket messages here.
io.on("connection", (socket) => {
    if (usersConnected === 0) {
        emitAction(MessageType.programMaster, true);//First user connected is given a slider bar to interact with.
    }
    usersConnected++;
    console.log(`User Connected: ${usersConnected} users online.`);

    emitAction(MessageType.usercount, usersConnected);

    socket.on(MessageType.programUpdate, (data) => {
        emitAction(MessageType.updateProgressBar, data.value);
    });

    socket.on(MessageType.disconnect, (data) => {
        usersConnected--;
        emitAction(MessageType.usercount, usersConnected);
        console.log(`User Disconnected: ${usersConnected} users online.`);
    });
});

httpServer.listen(PORT);
console.log(`Socket Server Running on Port:${PORT}`);

