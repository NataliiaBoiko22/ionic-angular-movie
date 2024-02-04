import { AppState } from "./AppState";
import { MovieState } from "./movie/Movie.State";

export const AppInitialState: AppState = {
    loading:{
    show: false
    },
    login:{
        error: null,
isRecoveredPassword: false,
isRecoveringPassword: false,
isLoggedIn: false,
isLoggingIn: false,

    },
    movieItems: {
        movieItems: []
      },


}