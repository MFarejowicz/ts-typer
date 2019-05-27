import { PHASE, GameState, GameActionType, CHANGE_PHASE, UPDATE_WORDS, MOVE_WORDS, LOSE_HP, UP_SCORE, RESET } from './types';

const initialState: GameState = {
  phase: PHASE.START,
  hp: 100,
  score: 0,
  words: [],
}

export function gameReducer(state: GameState = initialState, action: GameActionType): GameState {
  switch (action.type) {
    case CHANGE_PHASE:
      return { ...state, phase: action.phase };
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
    case RESET:
      return { phase: PHASE.START, hp: 100, score: 0, words: [] };
    default:
      return state;
  }
}