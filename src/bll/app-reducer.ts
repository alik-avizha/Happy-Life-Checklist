const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//ActionCreators
export const setAppStatusAC = (status: RequestStatusType) =>({type: 'APP/SET-STATUS',status} as const)
export const setAppErrorAC = (error: null | string) =>({type: 'APP/SET-ERROR',error} as const)

//typing
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export type AppActionsType = SetAppStatusACType | SetAppErrorACType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState