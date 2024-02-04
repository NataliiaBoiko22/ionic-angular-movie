import {StoreModule} from '@ngrx/store';
import { loadingReducer } from './loading/loading.reducers';
import { loginReducer } from './login/login.reducers';
import { movieReducer } from './movie/movie.reducers';

export const AppStoreModule = [
StoreModule.forRoot([]),
StoreModule.forFeature("loading", loadingReducer),
StoreModule.forFeature("login", loginReducer),
StoreModule.forFeature("movie", movieReducer),

]