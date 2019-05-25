import { GameState, GameActionType, UPDATE_WORDS } from './types';

const initialState: GameState = {
  words: [{
    text: "this",
    complete: false,
    active: false,
    charIndex: 0,
  }],
}

export function gameReducer(state: GameState = initialState, action: GameActionType): GameState {
  switch (action.type) {
    case UPDATE_WORDS:
      return { words: action.words };
    default:
      return state;
  }
}