import React from 'react';
import ReactDOM from 'react-dom/client';
import { PlayerInfoModal } from './components/PlayerInfo/PlayerInfo';
import './index.css';

class Board extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentValue: 'X',
      winner: null,
      squareValues: Array.from(
        { length:3 }, () => (Array.from({ length:3 }, ()=> null))
      )
    };
  }

  selectSquare(row, col) {
    const squareValues = this.state.squareValues.slice();
    const winner = this.state.winner;

    if(squareValues[row][col] === null && !winner){
      const nextValue = this.state.currentValue === 'X' ? 'O' : 'X';

      squareValues[row][col] = this.state.currentValue;
      this.setState({squareValues: squareValues, currentValue: nextValue});
    } else {
      //TODO: error that square has already been used in previous turn or winner exists
    }
  }

  determineWinningValue() {
    const flatIndexValues = this.state.squareValues.slice().flat(1);

    const winConditionIndexes = [
      [0, 1, 2], // horizontal (1st row) 
      [3, 4, 5], // horizontal (2nd row)
      [6, 7, 8], // horizontal (3rd row)
      [0, 3, 6], // vertical (1st column)
      [1, 4, 7], // vertical (2nd column)
      [2, 5, 8], // vertical (3rd column)
      [0, 4, 8], // diagonal (top-left -> bottom-right)
      [2, 4, 6], // diagonal (bottom-left -> top-right)
    ];
    for (let i = 0; i < winConditionIndexes.length; i++) {
      const [a, b, c] = winConditionIndexes[i];
      //victory if value at all indexes for given win condition are equal and not nullish
      if (flatIndexValues[a] && flatIndexValues[a] === flatIndexValues[b] && flatIndexValues[a] === flatIndexValues[c]) {
        return flatIndexValues[a];
      }
    }
    return null;
  }

  render() {
    let winner = this.determineWinningValue();
    let player = this.state.currentValue ==='X' ? this.props.playerNames[0] : this.props.playerNames[1];
    let message = winner ? "Winner is: " : "Next player is: ";

    const status = message + player;

    return (
      <div>
        <div className="status">{status}</div>
        <table>
          <tbody>
            {/* 3 rows of 3 cells */}
            {[...Array(3).keys()].map(row => 
            <tr key={row}> 
              {[...Array(3).keys()].map(col => 
              <td onClick={()=>{this.selectSquare(row, col)}} key={row + "_" + col}> 
                {this.state.squareValues[row][col]}
              </td>)} 
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}


//========================================================================================================================

class Game extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      promptPlayerNames: true,
      players: {0: null, 1: null}
    }
  }

  setPlayer(key, value){
    let players = this.state.players;

    players[key] = value;
    this.setState({players});
  }

  startGame(){
    //if both players have names given, hide input modal and begin game
    if(this.state.players['0'] && this.state.players['1']){
      this.setState({...this.state, promptPlayerNames: false});
    } else {
      //TODO throw error about missing player names
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board playerNames={this.state.players}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>

        {this.state.promptPlayerNames && <PlayerInfoModal playerNameChange={(playerName, value) => this.setPlayer(playerName, value)} startGame={()=> this.startGame()}/>}
      </div>
    );
  }
}


//========================================================================================================================


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
