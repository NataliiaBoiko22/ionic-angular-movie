import { Action, createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { setMovies } from "./movie.actions";
import { MovieState } from "./Movie.State";

const initialState: MovieState = AppInitialState.movieItems;

const reducer = createReducer(initialState,
 
    on(setMovies,(state, { results }): MovieState => ({ ...state, movieItems: results })
    ))
    export function movieReducer(state: MovieState, action: Action){
        return reducer(state, action);
        }