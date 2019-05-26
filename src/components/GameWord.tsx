import * as React from 'react';
import './GameWord.css';

interface Props {
  text: string;
  complete: boolean;
  active: boolean;
  charIndex: number;
  top: number;
  left: number;
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
      left: `${this.props.left}vh`,
    };

    return (
      <div className="word" style={liveStyle}>
          <span className="word-start">{text.substring(0, charIndex)}</span>
          <span className="word-end">{text.substring(charIndex)}</span>
      </div>
    );
  }

}

export default GameWord;