import { 
  PHASE, 
  GameState, 
  GameActionType, 
  CHANGE_WORD_SET, 
  CHANGE_PHASE, 
  UPDATE_WORDS, 
  MOVE_WORDS, 
  LOSE_HP, 
  UP_SCORE, 
  UP_STREAK,
  RESET_STREAK,
  RESET_GAME,
} from './types';

const initialState: GameState = {
  wordSet: 'common',
  phase: PHASE.START,
  hp: 100,
  score: 0,
  streak: 0,
  words: [],
}

export function gameReducer(state: GameState = initialState, action: GameActionType): GameState {
  switch (action.type) {
    case CHANGE_WORD_SET:
      return { ...state, wordSet: action.wordSet };
    case CHANGE_PHASE:
      return { ...state, phase: action.phase };
    case UPDATE_WORDS:
      return { ...state, words: action.words };
    case MOVE_WORDS:
      const newWords = [...state.words];
      newWords.forEach(el => el.left -= el.speed);
      return { ...state, words: newWords };
    case LOSE_HP:
      return { ...state, hp: state.hp - action.amount };
    case UP_SCORE:
      return { ...state, score: state.score + action.amount };
    case UP_STREAK:
      return { ...state, streak: state.streak + 1 };
    case RESET_STREAK:
      return { ...state, streak: 0 };    
    case RESET_GAME:
      return { ...state, phase: PHASE.START, hp: 100, score: 0, streak: 0, words: [] };
    default:
      return state;
  }
}