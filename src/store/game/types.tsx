export interface Word {
  text: string;
  complete: boolean;
  active: boolean;
  charIndex: number;
}

export interface GameState {
  words: Word[]
}

export const UPDATE_WORDS = 'UPDATE_WORDS';
export type UPDATE_WORDS = typeof UPDATE_WORDS;

export interface UpdateWordsAction {
  type: UPDATE_WORDS;
  words: Word[];
}

export type GameActionType = UpdateWordsAction;