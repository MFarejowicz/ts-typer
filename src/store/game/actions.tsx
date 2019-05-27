import { 
  PHASE, 
  Word, 
  CHANGE_WORD_SET, 
  CHANGE_PHASE, 
  UPDATE_WORDS, 
  MOVE_WORDS, 
  LOSE_HP, 
  UP_SCORE, 
  RESET, 
  GameActionType 
} from './types';

export function changeWordSet(wordSet: string): GameActionType {
  return {
    type: CHANGE_WORD_SET,
    wordSet,
  }
}

export function changePhase(phase: PHASE): GameActionType {
  return {
    type: CHANGE_PHASE,
    phase,
  }
}

export function updateWords(words: Word[]): GameActionType {
  return {
    type: UPDATE_WORDS,
    words,
  }
}

export function moveWords(): GameActionType {
  return {
    type: MOVE_WORDS,
  }
}

export function loseHP(): GameActionType {
  return {
    type: LOSE_HP,
  }
}

export function upScore(amount: number): GameActionType {
  return {
    type: UP_SCORE,
    amount,
  }
}

export function reset(): GameActionType {
  return {
    type: RESET,
  }
}