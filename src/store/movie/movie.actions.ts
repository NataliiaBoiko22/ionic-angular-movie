import { createAction, props } from "@ngrx/store";
import { Movie } from "src/app/interfaces/interfaces";

export const setMovies = createAction(
    "[App] Set Search Results",
    props<{ results: Movie[] }>()
);