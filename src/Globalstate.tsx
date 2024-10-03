import React, { useReducer, useEffect, createContext } from 'react';
import globalStateReducer from './GlobalStateReducer';
import { GlobalStateType, GlobalStateContextType, ActionType } from "./types";
import io from 'socket.io-client';
let socket = io("http://localhost:3666");

//Initial State
const initialState: GlobalStateType = {
    usersOnline: 0,
    heartBeats: 0,
    serverHB: 0,
    prog: 0,
    isProgMaster: false,
    currentAlert: null,
};

//Context
export const GlobalStateContext = createContext<GlobalStateContextType | null>(null);



export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialState);
    useEffect(() => {
        console.log(`🌎...Global State initalized!`);

        socket.on("action", (data) => {
            dispatch(data);
        });
        socket.on("progMaster", (_data) => {
            const program_master = { type: ActionType.programMaster, payload: true };
            dispatch(program_master);
        });
    }, []);

    const ResetAll = () => {
        const reset_options = { type: ActionType.reset, payload: initialState };
        dispatch(reset_options);
    }

    const handleSlider = (value: number) => {
        //grab value and update.
        const slider_options = { type: ActionType.updateProgressBar, payload: value }
        dispatch(slider_options);
        socket.emit('progUpdate', { value: value });
    }

    const value = React.useMemo(() => {
        return {
            state, ResetAll, handleSlider
        }
    }, [state]);

    return (
        <GlobalStateContext.Provider value={value} >
            {children}
        </GlobalStateContext.Provider >
    );

};

