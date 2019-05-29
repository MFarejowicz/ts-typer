export enum PHASE {
  START = 'START',
  ACTION = 'ACTION',
  END = 'END'
}

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
  wordSet: string;
  phase: PHASE;
  hp: number;
  score: number;
  streak: number;
  words: Word[];
}

export const CHANGE_WORD_SET = 'CHANGE_WORD_SET';
export type CHANGE_WORD_SET = typeof CHANGE_WORD_SET;

export const CHANGE_PHASE = 'CHANGE_PHASE';
export type CHANGE_PHASE = typeof CHANGE_PHASE;

export const UPDATE_WORDS = 'UPDATE_WORDS';
export type UPDATE_WORDS = typeof UPDATE_WORDS;

export const MOVE_WORDS = 'MOVE_WORDS';
export type MOVE_WORDS = typeof MOVE_WORDS;

export const LOSE_HP = 'LOSE_HP';
export type LOSE_HP = typeof LOSE_HP;

export const UP_SCORE = 'UP_SCORE';
export type UP_SCORE = typeof UP_SCORE;

export const UP_STREAK = 'UP_STREAK';
export type UP_STREAK = typeof UP_STREAK;

export const RESET_STREAK = 'RESET_STREAK';
export type RESET_STREAK = typeof RESET_STREAK;

export const RESET_GAME = 'RESET_GAME';
export type RESET_GAME = typeof RESET_GAME;

export interface ChangeWordSetAction {
  type: CHANGE_WORD_SET;
  wordSet: string;
}

export interface ChangePhaseAction {
  type: CHANGE_PHASE;
  phase: PHASE;
}

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

export interface UpStreakAction {
  type: UP_STREAK;
}

export interface ResetStreakAction {
  type: RESET_STREAK;
}

export interface ResetGameAction {
  type: RESET_GAME;
}

export type GameActionType = ChangeWordSetAction | ChangePhaseAction | UpdateWordsAction | 
                             MoveWordsAction | LoseHPAction | UpScoreAction | 
                             UpStreakAction | ResetStreakAction | ResetGameAction;