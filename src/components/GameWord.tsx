import * as React from 'react';
import './GameWord.css';

interface Props {
  id: number;
  text: string;
  complete: boolean;
  active: boolean;
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
    const { text, active, charIndex } = this.props;

    const liveStyle = {
      border: (active) ? "1px solid green" : "1px solid black",
      top: `${this.props.top}vh`,
      left: `calc(100px + ${this.props.left}vw)`,
    };

    if (this.props.left <= 0) {
      this.props.handleLoss(this.props.id);
    }

    return (
      <div className="word" style={liveStyle}>
          <span className="word-start">{text.substring(0, charIndex)}</span>
          <span className="word-end">{text.substring(charIndex)}</span>
      </div>
    );
  }

}

export default GameWord;