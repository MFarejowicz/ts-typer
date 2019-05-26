import { Word, UPDATE_WORDS, MOVE_WORDS, LOSE_HP, UP_SCORE, GameActionType } from './types'

export function updateWords(newWords: Word[]): GameActionType {
  return {
    type: UPDATE_WORDS,
    words: newWords,
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