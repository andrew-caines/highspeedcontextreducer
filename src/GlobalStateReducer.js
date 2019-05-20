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