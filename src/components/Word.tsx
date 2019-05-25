import * as React from 'react';
import './Word.css';

export interface Props {
  text: string;
  complete: boolean;
  active: boolean;
  charIndex: number;
}

interface State {
}

class Word extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  
  render() {
    const { text, charIndex } = this.props;
    
    return (
      <div className="word">
          <span className="word-start">{text.substring(0, charIndex)}</span>
          <span className="word-end">{text.substring(charIndex)}</span>
      </div>
    );
  }

}

export default Word;