import { React, useEffect, useState, useContext } from 'react';
import { PlayerInfoModal } from '../PlayerInfo/PlayerInfo';
import { GameControls } from '../GameControls/GameControls';
import { GameHistoryContext } from '../../gameHistoryContext'; 

import './Game.css';

export function Game(props) {
  const [playerNamesPrompt, promptForPlayerNames] = useState(true);
  const [players, setPlayers] = useState({0: null, 1: null});
  //3x3 2d array of nulls
  const [squareValues, setSquareValues] = useState(Array.from({ length:3 }, () => (Array.from({ length:3 }, ()=> null))));
  const [currentValue, setCurrentValue] = useState('X');
  const [turnCounter, setTurnCount] = useState(0);

  const gameHistory = useContext(GameHistoryContext);
  const winner = determineWinningValue();

  //callback to push new game history to global state in App used as injected value of GameHistoryContext for Scoreboard
  //- whenever winner changes
  useEffect(()=>{
    //avoid initial assignment to null triggering dummy history data
    if(winner && players && turnCounter > 0){
        props.addHistory({players: players, winner: (winner === 'X' ? players[0] : players[1]), turns: turnCounter});
    }
  }, [winner])

  function setPlayer(key, value){
    //assign player name, update players state
    players[key] = value;
    setPlayers({...players});
  }

  function startGame(){
    //if both players have names given, hide input modal and begin game
    if(players['0'] && players['1']){
      if(players['0'] !== players['1']){
        //identify if player matchup has played before
        const previousMatch = gameHistory.filter(hist => 
          (hist.loser === players['0'] && hist.winner === players['1'])
          || (hist.loser === players['1'] && hist.winner === players['0'])
        )?.[0]; //take top match of X - sorted array so top === latest 
    
        if(previousMatch){
          //set players such that the previous winner in matchup is player 1 (first turn)
          setPlayers({0: previousMatch.winner, 1: previousMatch.loser});
        }

        promptForPlayerNames(false);
      } else {
        //TODO: display error about duplicate names
      }
    } else {
      console.error("MISSING PLAYER NAME");
      //TODO: display error
    }
  }

  function selectSquare(row, col) {
    //copy squareValues for updating - keep state immutable
    const squares = squareValues.slice();

    //if game in play and selected square is vacant, play that square
    if(squares[row][col] === null && !winner){
      //play square for current player, update player value
      const nextValue = currentValue === 'X' ? 'O' : 'X';
      squares[row][col] = currentValue;

      //immutably update states (assign new values)
      setSquareValues(squares);
      setCurrentValue(nextValue);
      setTurnCount(turnCounter + 1);
    } else {
      if(winner) console.error("GAME ALREADY WON BY", winner);
      //TODO: display error
      if(squares[row][col] !== null) console.error("SQUARE ALREADY PLAYED BY:", squares[row][col]);
      //TODO: display error
    }
  }

  function determineWinningValue() {
    //flatten 3x3 2d into 1x9 1d for easier win comparisons
    const flatIndexValues = squareValues.slice().flat(1);

    //win conditions - 1d index groupings that must have identical values to trigger a win 
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

    //victory if value at all indexes for given win condition are equal and not nullish
    for (let i = 0; i < winConditionIndexes.length; i++) {
      const [a, b, c] = winConditionIndexes[i];
      if (flatIndexValues[a] && flatIndexValues[a] === flatIndexValues[b] && flatIndexValues[a] === flatIndexValues[c]) {
        return flatIndexValues[a];
      }
    }
    return null;
  }

  function getGameStatus(){
    //return status string of current game
    if(winner){
      return "Winner: " + (winner === 'X' ? players[0] : players[1]);
    }
    return "Next turn: " + (currentValue === 'X' ? players[0] : players[1]);
  }
  
  function resetGame(){
    setSquareValues(Array.from({ length:3 }, () => (Array.from({ length:3 }, ()=> null))));
    setCurrentValue('X');
    setTurnCount(0);
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
              <td onClick={()=>{selectSquare(row, col)}} key={row + "_" + col} className={squareValues[row][col] ? "square square-" + squareValues[row][col].toLowerCase() : "square"}> 
                {squareValues[row][col]}
              </td>)} 
            </tr>)}
          </tbody>
        </table>
      </div>
      <GameControls winner={winner} resetClicked={resetGame}/>

      {playerNamesPrompt && <PlayerInfoModal playerNameChange={(playerName, value) => setPlayer(playerName, value)} startGame={()=> startGame()}/>}
    </div>
  );
}