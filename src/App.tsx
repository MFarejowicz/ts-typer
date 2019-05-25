import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from './store/game/actions';
import { AppState } from './store';
import { Word, GameState, UpdateWordsAction } from './store/game/types';
import { playAudio } from './Audio';
import GameWord from './components/GameWord';
import './App.css';

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: Dispatch<UpdateWordsAction>) => ({
  updateWords: (newWords: Word[]) => dispatch(actions.updateWords(newWords)),
});

interface Props {
  game: GameState;
  updateWords: (newWords: Word[]) => UpdateWordsAction;
}

class App extends React.Component<Props>{
  text: string[];
  wordIndex: number;

  constructor(props: Props) {
    super(props);
    this.text = ["this", "is", "a", "test"];
    this.wordIndex = 0;
  }

  handleKeyPress = (e: KeyboardEvent) => {
    const guess = e.key;
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

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  
  public render() {
    return (
      <div>
        {this.props.game.words.map((el, index) => {
          return <GameWord key={index} text={el.text} complete={el.complete} active={el.active} charIndex={el.charIndex}/>
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

  checkGuess = (guess: string, index: number): void => {
    const newWords = [...this.props.game.words];
    const currentWord = newWords[index];
    if (guess === currentWord.text.charAt(currentWord.charIndex)) {
      if (currentWord.charIndex === currentWord.text.length-1) {
        newWords.splice(index, 1);
        this.wordIndex += 1;
        newWords.push({
          text: this.text[this.wordIndex],
          complete: false,
          active: false,
          charIndex: 0,
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
