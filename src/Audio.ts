import BACKGROUND from './resources/audio/background.mp3';
import START from './resources/audio/start.mp3';
import BEEP from './resources/audio/beep.mp3';
import LVLUP from './resources/audio/lvlup.mp3';
import CORRECT from './resources/audio/correct.mp3';
import COMPLETE from './resources/audio/complete.mp3';
import WRONG from './resources/audio/wrong.mp3';
import OOF from './resources/audio/oof.mp3';

const audioMap = {
  'BACKGROUND': new Audio(BACKGROUND),
  'START': START,
  'BEEP': BEEP,
  'LVLUP': LVLUP,
  'CORRECT': CORRECT,
  'COMPLETE': COMPLETE,
  'WRONG': WRONG,
  'OOF': OOF,
}

/**
 * Plays audio `name` at `volume`.
 */
export function playAudio(name: string, volume: number = 1): void {
  if (name === 'BACKGROUND') {
    const audio = audioMap[name];
    audio.volume = 0.2;
    audio.loop = true;
    audio.currentTime = 0;
    audio.play();
  } else {
    const audio = new Audio(audioMap[name]);
    audio.volume = volume;
    audio.play();
  }
}

export function stopAudio(name: string): void {
  if (name === 'BACKGROUND') {
    const audio = audioMap[name];
    audio.pause();
  }
}