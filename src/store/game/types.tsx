export interface Word {
  text: string;
  complete: boolean;
  active: boolean;
  charIndex: number;
  top: number;
  left: number;
  speed: number;
}

export interface GameState {
  hp: number;
  score: number;
  words: Word[];
}

export const UPDATE_WORDS = 'UPDATE_WORDS';
export type UPDATE_WORDS = typeof UPDATE_WORDS;

export const MOVE_WORDS = 'MOVE_WORDS';
export type MOVE_WORDS = typeof MOVE_WORDS;

export const LOSE_HP = 'LOSE_HP';
export type LOSE_HP = typeof LOSE_HP;

export const UP_SCORE = 'UP_SCORE';
export type UP_SCORE = typeof UP_SCORE;

export interface UpdateWordsAction {
  type: UPDATE_WORDS;
  words: Word[];
}

export interface MoveWordsAction {
  type: MOVE_WORDS;
}

export interface LoseHPAction {
  type: LOSE_HP;
}

export interface UpScoreAction {
  type: UP_SCORE;
  amount: number;
}

export type GameActionType = UpdateWordsAction | MoveWordsAction | LoseHPAction | UpScoreAction;