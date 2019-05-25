/**
 * Plays audio `url` at `volume`.
 */
export function playAudio(url: string, volume: number = 1): void {
  const audio = new Audio(url);
  audio.volume = volume;
  audio.play();
}