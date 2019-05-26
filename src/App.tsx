import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from './store/game/actions';
import { AppState } from './store';
import { Word, GameState, GameActionType } from './store/game/types';
import { playAudio } from './Audio';
import GameWord from './components/GameWord';
import './App.css';

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch<GameActionType>) => ({
  updateWords: (newWords: Word[]) => dispatch(actions.updateWords(newWords)),
  moveWords: () => dispatch(actions.moveWords()),
});

interface Props {
  game: GameState;
  updateWords: (newWords: Word[]) => GameActionType;
  moveWords: () => GameActionType;
}

class App extends React.Component<Props>{
  text: string[];
  wordIndex: number;
  intervalID: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.text = ["here", "are", "a", "bunch", "of", "words", "and", "i", "hope", "this", "works"];
  }

  tick = (): void => {
    // A tick happens every 1/50th of a second.
    this.props.moveWords();
  }

  handleKeyPress = (e: KeyboardEvent): void => {
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
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.handleKeyPress);
    this.intervalID = setInterval(() => this.tick(), 20);
  }
  
  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.handleKeyPress);
    clearInterval(this.intervalID);
  }
  
  public render() {
    return (
      <div>
        {this.props.game.words.map((el, index) => {
          return <GameWord key={index} text={el.text} complete={el.complete} active={el.active} 
                    charIndex={el.charIndex} top={el.top} left={el.left} />
        })}
      </div>
    );
  }

  getActiveIndex = (): number | null => {
    for (let i = 0; i < this.props.game.words.length; i++) {
      const word = this.props.game.words[i];
      if (word.active) {
        return i;
      }
    }
    return null;
  }

  findMatchingIndex = (guess: string): number | null => {
    for (let i = 0; i < this.props.game.words.length; i++) {
      const word = this.props.game.words[i];
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
    const newWords = [...this.props.game.words];
    const currentWord = newWords[index];
    if (guess === currentWord.text.charAt(currentWord.charIndex)) {
      if (currentWord.charIndex === currentWord.text.length-1) {
        newWords.splice(index, 1);
        this.wordIndex += 1;
        newWords.push({
          text: this.choose(this.text),
          complete: false,
          active: false,
          charIndex: 0,
          top: 50,
          left: 100,
        })
        playAudio('COMPLETE');
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
