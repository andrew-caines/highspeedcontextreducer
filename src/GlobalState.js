import React, { useReducer, useEffect } from 'react';
import globalStateReducer from './GlobalStateReducer';

//Socket
import io from 'socket.io-client';
let socket = io("http://localhost:3666");

//Context
export const GlobalStateContext = React.createContext();

const initialState = {
    usersOnline: 0,
    heartBeats: 0,
    serverHB: 0,
    prog: 0,
    isProgMaster: false,
    currentAlert: null,
    users: [],
    messages: []
};

export const GlobalStateProvider = (props) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialState);

    useEffect(() => {
        console.log(`🌎...Global State initalized!`);

        socket.on("action", (data) => {
            dispatch(data);
        });
        socket.on("progMaster", (data) => {
            dispatch(data);
        });
    }, []);

    const ResetAll = () => {
        dispatch({ type: 'resetAll', payload: initialState });
    }

    const handleSlider = (e) => {
        //grab value and update.
        dispatch({ type: 'updateProgress', payload: e.currentTarget.value });
        socket.emit('progUpdate', { value: e.currentTarget.value });
    }

    const value = React.useMemo(() => {
        return {
            state, ResetAll, handleSlider
        }
    }, [state]);

    return (
        <GlobalStateContext.Provider value={value} >
            {props.children}
        </GlobalStateContext.Provider >
    );
}