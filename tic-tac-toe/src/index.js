import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//controlled function component
//- maintains no state
//- impl as the return of the would-be render() function
function Square(props) {
  return (
    <button 
      className="square" 
      onClick={()=>{props.squareClickCallback()}}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentValue: 'X',
      winner: null,
      squareValues: Array(9).fill(null)
    };
  }

  selectSquare(i) {
    const squareValues = this.state.squareValues.slice();
    const winner = this.state.winner;
    if(squareValues[i] === null && !winner){
      const nextValue = this.state.currentValue === 'X' ? 'O' : 'X';

      squareValues[i] = this.state.currentValue;
      this.setState({squareValues: squareValues, currentValue: nextValue});
    } else {
      //TODO: error that square has already been used in previous turn
    }
  }

  calculateWinner() {
    const squareValues = this.state.squareValues.slice();

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squareValues[a] && squareValues[a] === squareValues[b] && squareValues[a] === squareValues[c]) {
        return squareValues[a];
      }
    }
    return null;
  }

  renderSquare(i) {
    return <Square 
      value={this.state.squareValues[i]}
      squareClickCallback={() => this.selectSquare(i)}
    />;
  }

  render() {
    let winner = this.calculateWinner();
    let player = this.state.currentValue ==='X' ? this.props.playerNames[0] : this.props.playerNames[1];
    let message = winner ? "Winner is: " : "Next player is: ";

    const status = message + player;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board playerNames={['John', 'David']}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
