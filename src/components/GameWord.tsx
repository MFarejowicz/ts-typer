import * as React from 'react';
import './GameWord.css';

interface Props {
  id: number;
  text: string;
  complete: boolean;
  active: boolean;
  givenUp: boolean;
  charIndex: number;
  top: number;
  left: number;
  speed: number;
  handleLoss: (index: number) => void;
}

interface State {
}

class GameWord extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  
  render() {
    const { text, givenUp, charIndex } = this.props;

    const liveStyle = {
      border: this.decideBorder(),
      backgroundColor: this.decideBackground(),
      top: `${this.props.top}vh`,
      left: `calc(100px + ${this.props.left}vw)`,
    };

    if (this.props.left <= 0) {
      this.props.handleLoss(this.props.id);
    }

    return (
      <div className='word' style={liveStyle}>
          <span className={(givenUp) ? 'start-red' : 'start-green'}>{text.substring(0, charIndex)}</span>
          <span className={(givenUp) ? 'end-red' : 'end-green'}>{text.substring(charIndex)}</span>
      </div>
    );
  }

  decideBorder = () => {
    if (this.props.givenUp) {
      return '2px solid #db2929';
    } else if (this.props.active) {
      return '2px solid #0e8c3a';
    } else {
      return '2px solid black';
    }
  }

  decideBackground = () => {
    if (this.props.givenUp) {
      return '#fbe9e9';
    } else if (this.props.active) {
      return '#e8f4ed';
    } else {
      return 'white';
    }
  }

}

export default GameWord;