import { LoadingState } from "./loading/LoadingState";
import { LoginState } from "./login/Login.State";

export interface AppState {
loading: LoadingState;
login: LoginState;
}