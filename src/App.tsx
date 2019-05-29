import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from './store/game/actions';
import { AppState } from './store';
import { PHASE, Word, GameActionType } from './store/game/types';
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
  loseHP: () => dispatch(actions.loseHP()),
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
  loseHP: () => GameActionType;
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
  speed: number;
  text: string[];
  maxStreak: number;
  lastY: number;
  intervalID: NodeJS.Timeout;
  
  constructor(props: Props) {
    super(props);
    this.frame = 0;
    this.spawnChance = 0.005;
    this.speed = 0.2;
    this.maxStreak = 0;
    this.lastY = 0;
  }

  internalReset = (): void => {
    this.frame = 0;
    this.spawnChance = 0.005;
    this.speed = 0.2;
    this.maxStreak = 0;
    this.lastY = 0;
  }

  tick = (): void => {
    // A tick happens every 1/50th of a second.    
    this.frame += 1;

    this.props.moveWords();

    if (Math.random() < this.spawnChance) {
      this.spawn();
    }

    if (this.props.hp <= 0) {
      clearInterval(this.intervalID);
      this.props.changePhase(PHASE.END);
      stopAudio('BACKGROUND');
      return;
    }

    if (this.frame % 2500 === 0) {
      this.speed += 0.05;
      playAudio('LVLUP');
    } else if (this.frame % 500 === 0) {
      this.spawnChance += 0.001;
      playAudio('BEEP');
    }

    console.log(this.maxStreak);
    
  }

  spawn = () => {
    let newY = Math.floor(Math.random() * 80) + 12;
    while (Math.abs(newY - this.lastY) < 10) {
      newY = Math.floor(Math.random() * 80) + 12;
    }
    this.lastY = newY;
    
    const newWords = [...this.props.words];
    newWords.push({
      text: this.choose(this.text),
      complete: false,
      active: false,
      charIndex: 0,
      top: newY,
      left: 95,
      speed: this.speed,
    });
    this.props.updateWords(newWords);
  }

  handleLoss = (index: number) => {
    const newWords = [...this.props.words];
    newWords.splice(index, 1);
    this.props.updateWords(newWords);
    this.props.loseHP();
    playAudio('OOF');
  }

  handleKeyPress = (event: KeyboardEvent): void => {
    switch (this.props.phase) {
      case PHASE.START:
        if (event.key === ' ') {
          playAudio('START');
          playAudio('BACKGROUND');
          this.text = parseText(this.props.wordSet);
          this.props.changePhase(PHASE.ACTION);
          this.intervalID = setInterval(() => this.tick(), 20);
        }
        break;
      case PHASE.ACTION:
          const guess = event.key.toLowerCase();
          const activeIndex = this.getActiveIndex();
              
          if (activeIndex !== null) {
            this.checkGuess(guess, activeIndex);
          } else {
            const matchingIndex = this.findMatchingIndex(guess);
            
            if (matchingIndex !== null) {
              this.checkGuess(guess, matchingIndex);
            } else {
              playAudio('WRONG');
              this.props.resetStreak();
            }
          }
          break;
      case PHASE.END:
          if (event.key === ' ') {
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
              return <GameWord key={index} id={index} text={el.text} complete={el.complete} active={el.active} 
                      charIndex={el.charIndex} top={el.top} left={el.left} speed={el.speed} handleLoss={this.handleLoss}/>
            })}
          </div>
        );
      case PHASE.END:
        return (
          <div>
            <EndScreen score={this.props.score} maxStreak={this.maxStreak} />
          </div>
        );
      default:
        throw 'Should never get here';
    }
  }

  getActiveIndex = (): number | null => {
    for (let i = 0; i < this.props.words.length; i++) {
      const word = this.props.words[i];
      if (word.active) {
        return i;
      }
    }
    return null;
  }

  findMatchingIndex = (guess: string): number | null => {
    for (let i = 0; i < this.props.words.length; i++) {
      const word = this.props.words[i];
      if (guess === word.text.charAt(0)) {
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
        playAudio('CORRECT', 0.5);
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
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
