import * as React from 'react';
import './App.css';
import { playAudio } from './Audio';
import CORRECT from './resources/correct.mp3';
import COMPLETE from './resources/complete.mp3';
import WRONG from './resources/wrong.mp3';
import Word from './components/Word';

interface Props {}

interface word {
  text: string;
  complete: boolean;
  active: boolean;
  charIndex: number;
}

interface State {
  words: word[];
}

class App extends React.Component<Props, State>{
  text: string[];
  wordIndex: number;

  constructor(props: Props) {
    super(props);
    this.text = ["this", "is", "a", "test"];
    this.wordIndex = 0;
    this.state = {
      words: [{
        text: this.text[0],
        complete: false,
        active: false,
        charIndex: 0,
      }],
    };
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
        playAudio(WRONG);
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
        {this.state.words.map((el, index) => {
          return <Word key={index} text={el.text} complete={el.complete} active={el.active} charIndex={el.charIndex}/>
        })}
      </div>
    );
  }

  getActiveIndex = (): number | null => {
    for (let i = 0; i < this.state.words.length; i++) {
      const word = this.state.words[i];
      if (word.active) {
        return i;
      }
    }
    return null;
  }

  findMatchingIndex = (guess: string): number | null => {
    for (let i = 0; i < this.state.words.length; i++) {
      const word = this.state.words[i];
      if (guess === word.text.charAt(0)) {
        return i;
      }
    }
    return null;
  }

  checkGuess = (guess: string, index: number): void => {
    const newWords = [...this.state.words];
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
        playAudio(COMPLETE);
      } else {
        playAudio(CORRECT, 0.5);
        currentWord.charIndex += 1;
        currentWord.active = true;
      }
      
      this.setState({
        words: newWords
      });  
    } else {
      playAudio(WRONG);
    }
  }
}

export default App;
