import { React, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { PlayerInfoModal } from './components/PlayerInfo/PlayerInfo';
import './index.css';


function Game() {
  const [promptPlayerNames, setPlayerNamePrompt] = useState(true);
  const [players, setPlayers] = useState({0: null, 1: null})
  const [squareValues, setsquareValues] = useState(Array.from({ length:3 }, () => (Array.from({ length:3 }, ()=> null))));
  const [currentValue, setCurrentValue] = useState('X');
  const winner = determineWinningValue();

  function setPlayer(key, value){
    //update specific player before updating state of both
    players[key] = value;
    setPlayers({...players});
  }

  function startGame(){
    //if both players have names given, hide input modal and begin game
    if(players['0'] && players['1']){
      setPlayerNamePrompt(false);
    } else {
      console.log("MISSING PLAYER NAME");
      //TODO throw error about missing player names
    }
  }

  function selectSquare(row, col) {
    const squares = squareValues.slice();

    if(squares[row][col] === null && !winner){
      const nextValue = currentValue === 'X' ? 'O' : 'X';

      squares[row][col] = currentValue;
      setsquareValues(squares);
      setCurrentValue(nextValue);
    } else {
      //TODO: throw error that square has already been used in previous turn or winner exists
    }
  }

  function determineWinningValue() {
    const flatIndexValues = squareValues.slice().flat(1);

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

  function getGameStatus(){
    if(winner){
      return "Winner: " + (winner === 'X' ? players[0] : players[1]);
    }
    return "Next turn: " + (currentValue === 'X' ? players[0] : players[1]);
  }
  
  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{getGameStatus()}</div>
        <table>
          <tbody>
            {/* 3 rows of 3 cells */}
            {[...Array(3).keys()].map(row => 
            <tr key={row}> 
              {[...Array(3).keys()].map(col => 
              <td onClick={()=>{selectSquare(row, col)}} key={row + "_" + col}> 
                {squareValues[row][col]}
              </td>)} 
            </tr>)}
          </tbody>
        </table>
      </div>
      <div className="game-info">
        <ol>{/* TODO */}</ol>
      </div>

      {promptPlayerNames && <PlayerInfoModal playerNameChange={(playerName, value) => setPlayer(playerName, value)} startGame={()=> startGame()}/>}
    </div>
  );
  
}


//========================================================================================================================


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
