import {Dispatch} from 'redux'
import {SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../../app/app-reducer';
import {authAPI, LoginDataType} from '../../dal/todolist-api';
import {handleServerAppError, handleServerNetworkError} from '../../uttils/error-utils';

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-Initialised':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitialisedAC = (value: boolean) =>
    ({type: 'login/SET-IS-Initialised', value} as const)

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitialisedAC(true))
        })
}

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('idle'))
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// types
type ActionsType =
    | ReturnType<typeof setIsInitialisedAC>
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusACType
    | SetAppErrorACType
