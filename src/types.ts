export enum ActionType {
    reset = 'reset',
    heartbeat = 'heartbeat',
    userCount = 'userCount',
    updateProgressBar = 'updateProgress',
    programMaster = 'progMaster',
}

export type ReducerPayload = {
    type: ActionType,
    payload?: any
};

export type GlobalStateType = {
    usersOnline: number,
    heartBeats: number,
    serverHB: number,
    prog: number,
    isProgMaster: boolean,
    currentAlert: null | number,
}
export type GlobalStateContextType = {
    state: GlobalStateType,
    ResetAll: () => void,
    handleSlider: (value: number) => void
}