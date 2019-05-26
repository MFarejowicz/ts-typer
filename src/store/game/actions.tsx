import { Word, UPDATE_WORDS, MOVE_WORDS, GameActionType } from './types'

export function updateWords(newWords: Word[]): GameActionType {
  return {
    type: UPDATE_WORDS,
    words: newWords
  }
}

export function moveWords(): GameActionType {
  return {
    type: MOVE_WORDS,
  }
}