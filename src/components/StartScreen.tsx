import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../store/game/actions';
import { AppState } from '../store';
import { GameActionType } from '../store/game/types';
import '../index.css';
import './StartScreen.css';

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<GameActionType>) => ({
  changeWordSet: (wordSet: string) => dispatch(actions.changeWordSet(wordSet)),
});

interface Props {
  changeWordSet: (wordSet: string) => GameActionType;
}

class StartScreen extends React.Component<Props> {
  handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    this.props.changeWordSet(event.currentTarget.value);
  }

  render() {
    return (
      <div className='center-column'>
        <div className='title'>TS TYPER</div>
        <div className='info text-section center-column'>
          <h1>Info</h1>
          <div>
            A game inspired by <a href='https://en.wikipedia.org/wiki/The_Typing_of_the_Dead'>The Typing of the Dead</a>.
          </div>
        </div>
        <div className='how-to-play text-section center-column'>
          <h1>How to play</h1>
          <div>
            Words will come from the right side of the screen. Type out the word to destroy it. 
            <br/>
            Once you start a word, you must finish it before starting another word. The current active word will be marked in green.
            <br/>
            If a word reaches the DANGER ZONE on the left side (indicated in orange), you will lose HP.
            <br/>
            Try to survive as long as possible!
          </div>
        </div>
        <div className='settings text-section center-column'>
          <h1>Settings</h1>
          <div>
          <span>{`Word set: `}</span>
          <select onChange={this.handleSelect}>
            <option value='common'>Common</option>
            <option value='borrowed'>Borrowed</option>
          </select>
          </div>
        </div>
        <div className='text-section center-column'>
          <h1>Got it?</h1>
          <h1>Press space to start!</h1>
        </div>
      </div>
    );
  }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);