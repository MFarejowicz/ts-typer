import * as React from 'react';
import './GameInfo.css';

interface Props {
  hp: number,
  score: number,
  streak: number,
}

interface State {
}

class GameInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  
  render() {
    const { hp, score, streak } = this.props;

    return (
      <div className='game-info'>
        <div className='hp'>
          <span>HP: {hp}</span>
        </div>
        <div className='score'>
          <span>Score: {score}</span>
        </div>
        <div className='streak'>
          <span>Streak: {streak}</span>
        </div>
      </div>
    );
  }
}

export default GameInfo;