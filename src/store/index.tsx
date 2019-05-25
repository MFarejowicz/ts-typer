import { combineReducers } from 'redux';
import { gameReducer } from './game/reducers';

export const rootReducer = combineReducers({
  game: gameReducer,
})

export type AppState = ReturnType<typeof rootReducer>