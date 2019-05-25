import { Word, UPDATE_WORDS, GameActionType } from './types'

export function updateWords(newWords: Word[]): GameActionType {
  return {
    type: UPDATE_WORDS,
    words: newWords
  }
}