import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from './store/game/actions';
import { AppState } from './store';
import { PHASE, letterKeys, Word, GameActionType } from './store/game/types';
import { parseText } from './TextParse';
import { playAudio, stopAudio } from './Audio';
import StartScreen from './components/StartScreen';
import SafeZone from './components/SafeZone';
import GameInfo from './components/GameInfo';
import GameWord from './components/GameWord';
import EndScreen from './components/EndScreen';
import './App.css';

const mapStateToProps = (state: AppState) => ({
  wordSet: state.game.wordSet,
  phase: state.game.phase,
  hp: state.game.hp,
  score: state.game.score,
  streak: state.game.streak,
  words: state.game.words,
});

const mapDispatchToProps = (dispatch: Dispatch<GameActionType>) => ({
  changePhase: (phase: PHASE) => dispatch(actions.changePhase(phase)),
  loseHP: (amount: number) => dispatch(actions.loseHP(amount)),
  upScore: (amount: number) => dispatch(actions.upScore(amount)),
  upStreak: () => dispatch(actions.upStreak()),
  resetStreak: () => dispatch(actions.resetStreak()),
  updateWords: (words: Word[]) => dispatch(actions.updateWords(words)),
  moveWords: () => dispatch(actions.moveWords()),
  resetGame: () => dispatch(actions.resetGame()),
});

interface Props {
  wordSet: string;
  phase: PHASE;
  hp: number;
  score: number;
  streak: number;
  words: Word[];
  changePhase: (phase: PHASE) => GameActionType;
  loseHP: (amount: number) => GameActionType;
  upScore: (amount: number) => GameActionType;
  upStreak: () => GameActionType;
  resetStreak: () => GameActionType;
  updateWords: (words: Word[]) => GameActionType;
  moveWords: () => GameActionType;
  resetGame: () => GameActionType;
}

class App extends React.Component<Props>{
  frame: number;
  spawnChance: number;
  minSpawnFreq: number;
  minSpawnCountdown: number;
  prevTops: number[];
  speed: number;
  text: string[];
  maxStreak: number;
  intervalID: NodeJS.Timeout;
  
  constructor(props: Props) {
    super(props);
    this.frame = 0;
    this.spawnChance = 0.005;
    this.minSpawnFreq = 50;
    this.minSpawnCountdown = 25;
    this.prevTops = [];
    this.speed = 0.2;
    this.maxStreak = 0;
  }

  internalReset = (): void => {
    this.frame = 0;
    this.spawnChance = 0.005;
    this.minSpawnFreq = 50;
    this.minSpawnCountdown = 25;
    this.prevTops = [];
    this.speed = 0.2;
    this.maxStreak = 0;
  }

  tick = (): void => {
    // A tick happens every 1/50th of a second.    
    this.frame += 1;
    this.minSpawnCountdown -= 1;

    this.props.moveWords();

    if (this.minSpawnCountdown <= 0 && Math.random() < this.spawnChance) {
      this.minSpawnCountdown = this.minSpawnFreq;
      this.spawn();
    }

    if (this.props.hp <= 0) {
      stopAudio('BACKGROUND');
      clearInterval(this.intervalID);
      this.props.changePhase(PHASE.END);
      document.body.style.overflow = 'auto';
      return;
    }

    if (this.frame % 2500 === 0) {
      this.speed += 0.05;
      playAudio('LVLUP');
    } else if (this.frame % 500 === 0) {
      this.spawnChance += 0.001;
      this.minSpawnFreq -= 1;
      playAudio('BEEP');
    }  
  }

  spawn = () => {
    const newWords = [...this.props.words];
    newWords.push({
      text: this.choose(this.text),
      complete: false,
      active: false,
      givenUp: false,
      charIndex: 0,
      top: this.pickTop(),
      left: 95,
      speed: this.speed,
    });
    this.props.updateWords(newWords);
  }

  handleLoss = (index: number) => {
    playAudio('OOF');
    const word = this.props.words[index];
    this.props.loseHP(word.text.length - word.charIndex);
    const newWords = [...this.props.words];
    newWords.splice(index, 1);
    this.props.updateWords(newWords);
  }

  handleKeyPress = (event: KeyboardEvent): void => {
    const keyPressed = event.key.toLowerCase();

    switch (this.props.phase) {
      case PHASE.START:
        if (keyPressed === ' ') {
          playAudio('START');
          playAudio('BACKGROUND');
          this.text = parseText(this.props.wordSet);
          this.props.changePhase(PHASE.ACTION);
          this.intervalID = setInterval(() => this.tick(), 20);
          document.body.style.overflow = 'hidden';
        }
        break;
      case PHASE.ACTION:
        const activeIndex = this.getActiveIndex();
          
        if (activeIndex !== null) {
          if (keyPressed === 'backspace') {
            playAudio('GIVEUP');
            this.giveUpOnWord(activeIndex);
          } else if (letterKeys.has(keyPressed)) {
            this.checkGuess(keyPressed, activeIndex);
          }
        } else {
          if (letterKeys.has(keyPressed)) {
            const matchingIndex = this.findMatchingIndex(keyPressed);
          
            if (matchingIndex !== null) {                                  
              this.checkGuess(keyPressed, matchingIndex);
            } else {
              playAudio('WRONG');
              this.props.resetStreak();
            }
          }
        }
        break;
      case PHASE.END:
          if (keyPressed === ' ') {
            this.internalReset();
            this.props.resetGame();
          }
          break;
      default:
        throw 'Should never get here';
    }
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  
  public render() {
    switch (this.props.phase) {
      case PHASE.START:
        return (
          <div>
            <StartScreen />
          </div>
        );
      case PHASE.ACTION:
        return (
          <div>
            <SafeZone />
            <GameInfo hp={this.props.hp} score={this.props.score} streak={this.props.streak} />
            {this.props.words.map((el, index) => {
              return <GameWord key={index} id={index} text={el.text} complete={el.complete} active={el.active} givenUp={el.givenUp}
                      charIndex={el.charIndex} top={el.top} left={el.left} speed={el.speed} handleLoss={this.handleLoss}/>
            })}
          </div>
        );
      case PHASE.END:
        return (
          <div>
            <EndScreen score={this.props.score} maxStreak={this.maxStreak} frames={this.frame} />
          </div>
        );
      default:
        throw 'Should never get here';
    }
  }

  getActiveIndex = (): number | null => {
    for (let i = 0; i < this.props.words.length; i++) {
      const word = this.props.words[i];
      if (!word.givenUp && word.active) {
        return i;
      }
    }
    return null;
  }

  findMatchingIndex = (guess: string): number | null => {
    for (let i = 0; i < this.props.words.length; i++) {
      const word = this.props.words[i];
      if (!word.givenUp && guess === word.text.charAt(0)) {
        return i;
      }
    }
    return null;
  }

  choose(items: any[]): any {
    return items[Math.floor(Math.random() * items.length)];
  }

  checkGuess = (guess: string, index: number): void => {
    const newWords = [...this.props.words];
    const currentWord = newWords[index];

    if (guess === currentWord.text.charAt(currentWord.charIndex)) {
      if (currentWord.charIndex === currentWord.text.length-1) {
        playAudio('COMPLETE');
        newWords.splice(index, 1);
        this.props.upStreak();
        this.props.upScore(1);
      } else {
        playAudio('CORRECT', 0.4);
        this.props.upStreak();
        currentWord.charIndex += 1;
        currentWord.active = true;
      }
      
      if (this.props.streak > this.maxStreak) {
        this.maxStreak = this.props.streak;
      }
      this.props.updateWords(newWords);
    } else {
      playAudio('WRONG');
      this.props.resetStreak();
    }
  }

  pickTop = (): number => {
    let newTop = Math.floor(Math.random() * 78) + 12;
    while (this.overlapsAny(newTop)) {
      newTop = Math.floor(Math.random() * 80) + 12;
    }

    this.prevTops.push(newTop);
    if (this.prevTops.length > 5) {
      this.prevTops.shift();
    }
    
    return newTop;
  }

  overlapsAny = (newTop: number): boolean => {
    return this.prevTops.some(prevTop => Math.abs(prevTop - newTop) < 10);
  }

  giveUpOnWord = (index: number): void => {
    const newWords = [...this.props.words];
    const currentWord = newWords[index];
    currentWord.active = false;
    currentWord.givenUp = true;
    this.props.updateWords(newWords);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
