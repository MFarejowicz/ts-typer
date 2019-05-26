export interface Word {
  text: string;
  complete: boolean;
  active: boolean;
  charIndex: number;
  top: number;
  left: number;
}

export interface GameState {
  words: Word[]
}

export const UPDATE_WORDS = 'UPDATE_WORDS';
export type UPDATE_WORDS = typeof UPDATE_WORDS;

export const MOVE_WORDS = 'MOVE_WORDS';
export type MOVE_WORDS = typeof MOVE_WORDS;

export interface UpdateWordsAction {
  type: UPDATE_WORDS;
  words: Word[];
}

export interface MoveWordsAction {
  type: MOVE_WORDS;
}

export type GameActionType = UpdateWordsAction | MoveWordsAction;