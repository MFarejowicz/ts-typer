import { GameState, GameActionType, UPDATE_WORDS, MOVE_WORDS } from './types';

const initialState: GameState = {
  words: [{
    text: "this",
    complete: false,
    active: false,
    charIndex: 0,
    top: 50,
    left: 100,
  }],
}

export function gameReducer(state: GameState = initialState, action: GameActionType): GameState {
  switch (action.type) {
    case UPDATE_WORDS:
      return { words: action.words };
    case MOVE_WORDS:
      const newWords = [...state.words];
      newWords.forEach(el => el.left-= 0.1);
      return { words: newWords };
    default:
      return state;
  }
}