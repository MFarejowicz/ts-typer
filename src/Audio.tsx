import CORRECT from './resources/correct.mp3';
import COMPLETE from './resources/complete.mp3';
import WRONG from './resources/wrong.mp3';

const audioMap = {
  'CORRECT': CORRECT,
  'COMPLETE': COMPLETE,
  'WRONG': WRONG,
}

/**
 * Plays audio `name` at `volume`.
 */
export function playAudio(name: string, volume: number = 1): void {
  const audio = new Audio(audioMap[name]);
  audio.volume = volume;
  audio.play();
}