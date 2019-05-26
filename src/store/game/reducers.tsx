import { GameState, GameActionType, UPDATE_WORDS, MOVE_WORDS, LOSE_HP, UP_SCORE } from './types';

const initialState: GameState = {
  hp: 100,
  score: 0,
  words: [{
    text: "this",
    complete: false,
    active: false,
    charIndex: 0,
    top: 50,
    left: 100,
    speed: 0.2,
  }],
}

export function gameReducer(state: GameState = initialState, action: GameActionType): GameState {
  switch (action.type) {
    case UPDATE_WORDS:
      return { ...state, words: action.words };
    case MOVE_WORDS:
      const newWords = [...state.words];
      newWords.forEach(el => el.left -= el.speed);
      return { ...state, words: newWords };
    case LOSE_HP:
      return { ...state, hp: state.hp-1 };
    case UP_SCORE:
      return { ...state, score: state.score + action.amount };
    default:
      return state;
  }
}