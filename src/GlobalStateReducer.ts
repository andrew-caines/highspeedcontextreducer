import { ActionType, ReducerPayload } from "./types";
import { GlobalStateType } from "./types";

export default function globalStateReducer(state: GlobalStateType, action: ReducerPayload) {
    switch (action.type) {
        case ActionType.reset:
            return action.payload;
        case ActionType.heartbeat:
            return { ...state, heartBeats: state.heartBeats + 1, serverHB: action.payload.serverHB, currentAlert: action.payload.alert };
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