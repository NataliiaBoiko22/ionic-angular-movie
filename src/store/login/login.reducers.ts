import { LoginState } from "./Login.State";
import { createReducer, on, Action } from "@ngrx/store";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess} from "./login.actions";
import { AppInitialState } from "../AppInitialState";

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState,
    on(recoverPassword, currentState => {
        return {...currentState,
            error: null,
    isRecoveredPassword: false,
    isRecoveringPassword: true,

        };
    }),
    on(recoverPasswordSuccess, currentState => {
        return {...currentState,
            error: null,
    isRecoveredPassword: true,
    isRecoveringPassword: false,

        };
    }),
    on(recoverPasswordFail, (currentState, action) => {
        return {...currentState,
            error: { error: action.error },
    isRecoveredPassword: false,
    isRecoveringPassword: false,

        };
    }),

 
    
    )
    export function loginReducer(state: LoginState, action: Action){
        return reducer(state, action);
        }
           