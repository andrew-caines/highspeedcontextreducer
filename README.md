## This is a quick demo of how to update a global context object via socket.io @ high speed.

I created this demo, because I was not able to find any examples of high speed context use in the wild.
Most sites recommend that you avoid using context for anything that is updated @ highspeed.

The optimizations for this to work appear as follows:
Inside the return function of the Provider, I useMemo:

```typescript
const value = React.useMemo(() => {
  return {
    state,
    ResetAll,
    handleSlider,
  };
}, [state]);
```

That is so the values exported don't trigger re-renders or reconcilations.

```javascript
useEffect(() => {
  console.log(`🌎...Global State initalized!`);
  socket.on("action", (data) => {
    dispatch(data);
  });
  socket.on("progMaster", (data) => {
    dispatch(data);
  });
}, []);
```

```typescript
import { ActionType, ReducerPayload } from "./types";
import { GlobalStateType } from "./types";

export default function globalStateReducer(state: GlobalStateType, action: ReducerPayload) {
  switch (action.type) {
    case ActionType.reset:
      return action.payload;
    case ActionType.heartbeat:
      return {
        ...state,
        heartBeats: state.heartBeats + 1,
        serverHB: action.payload.serverHB,
        currentAlert: action.payload.alert,
      };
    case ActionType.userCount:
      return { ...state, usersOnline: action.payload };
    case ActionType.updateProgressBar:
      return { ...state, prog: action.payload };
    case ActionType.programMaster:
      console.info(`Your web-client has the Progress Bar control.`);
      return { ...state, isProgMaster: true };
    default:
      return state;
  }
}
```

Therefor anything that comes out of the server, goes directly into the useReducer hook, which has optizmations wrapped around it aswell (from the library)

This allows for _very_ highspeed updates to occur both inside the context and all the way out to components.
If you wish to see the speeds:
server\server.js

```typescript
//MARK: Types
type HeartbeatPayload = {
  serverHB: number;
  alert: number;
};

type ProgramMaster = true;
type ProgramUpdate = {
  value: number;
};

enum MessageType {
  usercount = "userCount",
  heartbeat = "heartbeat",
  updateProgressBar = "updateProgress",
  programMaster = "progMaster",
  programUpdate = "progUpdate",
  disconnect = "disconnect",
}
interface Action<T> {
  type: MessageType;
  payload: T;
}

type PayloadMap = {
  [MessageType.usercount]: number;
  [MessageType.heartbeat]: HeartbeatPayload;
  [MessageType.programMaster]: ProgramMaster;
  [MessageType.programUpdate]: ProgramUpdate;
  [MessageType.updateProgressBar]: number;
  [MessageType.disconnect]: undefined;
};

setInterval(() => {
  emitAction(MessageType.heartbeat, {
    serverHB: serverHB,
    alert: Math.floor(Math.random() * 8) + 1,
  });
  serverHB++;
}, 150); //Change this 150 to whatever ms delay you wish to see
```

Just edit the call back speed, even at 1 chrome can keep up, Firefox in my testing cannot.
Thanks,
Andrew
