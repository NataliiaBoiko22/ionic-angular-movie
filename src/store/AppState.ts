import { LoadingState } from "./loading/LoadingState";
import { LoginState } from "./login/Login.State";
import { MovieState } from "./movie/Movie.State";

export interface AppState {
loading: LoadingState;
login: LoginState;
movieItems: MovieState;
}