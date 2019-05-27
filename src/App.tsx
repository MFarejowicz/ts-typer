import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from './store/game/actions';
import { AppState } from './store';
import { PHASE, Word, GameActionType } from './store/game/types';
import { playAudio } from './Audio';
import SafeZone from './components/SafeZone';
import GameInfo from './components/GameInfo';
import GameWord from './components/GameWord';
import './App.css';

const mapStateToProps = (state: AppState) => ({
  phase: state.game.phase,
  hp: state.game.hp,
  score: state.game.score,
  words: state.game.words,
});

const mapDispatchToProps = (dispatch: Dispatch<GameActionType>) => ({
  changePhase: (phase: PHASE) => dispatch(actions.changePhase(phase)),
  loseHP: () => dispatch(actions.loseHP()),
  upScore: (amount: number) => dispatch(actions.upScore(amount)),
  updateWords: (words: Word[]) => dispatch(actions.updateWords(words)),
  moveWords: () => dispatch(actions.moveWords()),
  reset: () => dispatch(actions.reset()),
});

interface Props {
  phase: PHASE;
  hp: number;
  score: number;
  words: Word[];
  changePhase: (phase: PHASE) => GameActionType;
  updateWords: (words: Word[]) => GameActionType;
  moveWords: () => GameActionType;
  loseHP: () => GameActionType;
  upScore: (amount: number) => GameActionType;
  reset: () => GameActionType;
}

class App extends React.Component<Props>{
  text: string[];
  intervalID: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.text = ["here", "are", "a", "bunch", "of", "words", "and", "i", "hope", "this", "works"];
  }

  tick = (): void => {
    // A tick happens every 1/50th of a second.
    this.props.moveWords();

    if (Math.random() < 0.01) {
      this.spawn();
    }

    if (this.props.hp <= 0) {
      clearInterval(this.intervalID);
      this.props.changePhase(PHASE.END);
    }
  }

  spawn = () => {
    const newWords = [...this.props.words];
    newWords.push({
      text: this.choose(this.text),
      complete: false,
      active: false,
      charIndex: 0,
      top: Math.floor(Math.random() * 80) + 10,
      left: 95,
      speed: 0.2,
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

  handleKeyPress = (e: KeyboardEvent): void => {
    switch (this.props.phase) {
      case PHASE.START:
        if (e.key === ' ') {
          this.props.changePhase(PHASE.ACTION);
        }
        this.intervalID = setInterval(() => this.tick(), 20);
        break;
      case PHASE.ACTION:
          const guess = e.key.toLowerCase();
          const activeIndex = this.getActiveIndex();
              
          if (activeIndex !== null) {
            this.checkGuess(guess, activeIndex);
          } else {
            const matchingIndex = this.findMatchingIndex(guess);
            
            if (matchingIndex !== null) {
              this.checkGuess(guess, matchingIndex);
            } else {
              playAudio('WRONG');
            }
          }
          break;
      case PHASE.END:
          if (e.key === ' ') {
            this.props.reset();
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
            This is a meme game. Press space to start.
          </div>
        );
      case PHASE.ACTION:
        return (
          <div>
            <SafeZone />
            <GameInfo hp={this.props.hp} score={this.props.score} />
            {this.props.words.map((el, index) => {
              return <GameWord key={index} id={index} text={el.text} complete={el.complete} active={el.active} 
                      charIndex={el.charIndex} top={el.top} left={el.left} speed={el.speed} handleLoss={this.handleLoss}/>
            })}
          </div>
        );
      case PHASE.END:
        return (
          <div>
            LOL you lost. Press space to head back to the start.
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

  choose(items: string[]): string {
    return items[Math.floor(Math.random() * items.length)];
 }

  checkGuess = (guess: string, index: number): void => {
    const newWords = [...this.props.words];
    const currentWord = newWords[index];
    if (guess === currentWord.text.charAt(currentWord.charIndex)) {
      if (currentWord.charIndex === currentWord.text.length-1) {
        newWords.splice(index, 1);
        playAudio('COMPLETE');
        this.props.upScore(1);
      } else {
        playAudio('CORRECT', 0.5);
        currentWord.charIndex += 1;
        currentWord.active = true;
      }
      
      this.props.updateWords(newWords);
    } else {
      playAudio('WRONG');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
