import COMMON from './resources/wordsets/common.js';
import BORROWED from './resources/wordsets/foreign.js';

const textMap = {
  'common': COMMON,
  'borrowed': BORROWED,
}

/**
 * Parses text
 */
export function parseText(name: string): string[] {
  const text = textMap[name];
  return text.split(/\r?\n/);
}