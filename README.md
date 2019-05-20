## This is a quick demo of how to update a global context object via socket.io @ high speed.

I created this demo, because I was not able to find any examples of high speed context use in the wild.
Most sites recommend that you avoid using context for anything that is updated @ highspeed.

The optimizations for this to work appear as follows:

Inside the return function of the Provider, I useMemo:

```javascript
const value = React.useMemo(() => {
        return {
            state, ResetAll, handleSlider
        }
    }, [state]);
```
That is so the values exported don't trigger re-renders or reconcilations.

The next is inside the GlobalState > there the socket.io verbs are started on the intial useEffect, with [] to indication only on inital strapping of the component.
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
Then what I did was match my reducer pattern, and my output from the Socket.io server to the same pattern, then inside the reducer:
```javascript
export default function globalStateReducer(state, action) {

    switch (action.type) {
        case 'reset':
            return action.payload;
        case 'heartbeat':
            return { ...state, heartBeats: state.heartBeats + 1, serverHB: action.payload.serverHB, currentAlert: action.payload.alert };
        case 'userCount':
            return { ...state, usersOnline: action.payload };
        case 'updateProgress':
            return { ...state, prog: action.payload };
        case 'progMaster':
            console.log(`Your Prog Master!`);
            return { ...state, isProgMaster: true };
        default:
            return state;
    }
}
```
Therefor anything that comes out of the server, goes directly into the useReducer hook, which has optizmations wrapped around it aswell (from the library)

This allows for *very* highspeed updates to occur both inside the context and all the way out to components. 
If you wish to see the speeds:
server\server.js
```javascript
setInterval(() => {
    server.emit("action", { type: 'heartbeat', payload: { serverHB: serverHB, alert: Math.floor(Math.random() * 8) + 1 } });
    serverHB++;
}, 10); //Change this 10 to whatever ms delay you wish to see
```
Just edit the call back speed, even at 1 chrome can keep up, Firefox in my testing cannot.

Thanks,
Andrew