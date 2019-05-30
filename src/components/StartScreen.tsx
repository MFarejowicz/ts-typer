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
        <div className='info text-section'>
          <h1>Info</h1>
          <div className='text-block'>
            This game was inspired by <a href='https://en.wikipedia.org/wiki/The_Typing_of_the_Dead'>The Typing of the Dead</a>. It is
            intended to be a fun way to practice typing skills.
            <br/>
            The game is written in <a href='https://www.typescriptlang.org/docs/handbook/react-&-webpack.html'>React with Typescript</a>, 
            and utilizes the <a href='https://redux.js.org/recipes/usage-with-typescript'>Redux</a> library for state management. This was 
            my first experience setting up and using Typescript or Redux!
            <br/>
            Please report any issues you find to the <a href='https://github.com/MFarejowicz/ts-typer'>GitHub repository</a>.
          </div>
        </div>
        <div className='how-to-play text-section'>
          <h1>How to play</h1>
          <div className='text-block'>
            Words emerge from the right side of the screen. You must type out the word to destroy it. 
            <br/>
            Once you start a word, you must either finish it or give it up to start another word. 
            The current active word will be marked in green. 
            To give up on a word, hit BACKSPACE. Giving up on a word will prevent you from ever typing out more of the word,
            but will let you start another word and preserves your streak.
            <br/>
            If a word reaches the DANGER ZONE on the left side (indicated in orange), you will lose HP. 
            The amount of HP you lose is the amount of untyped characters in the word.
            <br/>
            Every 10 seconds, the spawn rate of words will slightly increase. This will be indicated by a beep. Every 50 seconds,
            the speed of words will increase. This will be indicated by a bloop.
            <br/>
            Your HP and score are on the top right. Try to survive as long as possible!
          </div>
        </div>
        <div className='settings text-section'>
          <h1>Settings</h1>
          <div className='text-block'>
            <div className='single-setting'>
              <span className='setting-label'>{`Word set: `}</span>
              <select className='setting-select' onChange={this.handleSelect}>
                <option value='common'>Common</option>
                <option value='borrowed'>Borrowed</option>
              </select>
            </div>
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