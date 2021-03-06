import { 
  PHASE, 
  Word, 
  CHANGE_WORD_SET, 
  CHANGE_PHASE, 
  UPDATE_WORDS, 
  MOVE_WORDS, 
  LOSE_HP, 
  UP_SCORE, 
  UP_STREAK,
  RESET_STREAK,
  RESET_GAME, 
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

export function loseHP(amount: number): GameActionType {
  return {
    type: LOSE_HP,
    amount,
  }
}

export function upScore(amount: number): GameActionType {
  return {
    type: UP_SCORE,
    amount,
  }
}

export function upStreak(): GameActionType {
  return {
    type: UP_STREAK,
  }
}

export function resetStreak(): GameActionType {
  return {
    type: RESET_STREAK,
  }
}

export function resetGame(): GameActionType {
  return {
    type: RESET_GAME,
  }
}