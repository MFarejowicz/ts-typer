import * as React from 'react';
import '../index.css';
import './EndScreen.css';

interface Props {
  score: number,
  maxStreak: number,
}

class EndScreen extends React.Component<Props> {
  render() {
    return (
      <div className='center-column'>
        <div className='title'>Game Over</div>
        <div className='text-section'>
          <h1>Stats</h1>
          <div className='stats text-block'>
            <div>
              Score: {this.props.score}
            </div>
            <div>
              Max streak: {this.props.maxStreak}
            </div>
          </div>
        </div>
        <div className='text-section center-column'>
          <h1>Want to play again?</h1>
          <h1>Press space!</h1>
        </div>
      </div>
    );
  }
}

export default EndScreen