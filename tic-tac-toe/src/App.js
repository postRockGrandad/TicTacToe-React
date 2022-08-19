import { React, useState } from 'react';
import { Game } from "./components/Game/Game";
import { Scoreboard } from './components/Scoreboard/Scoreboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameHistoryContext } from './gameHistoryContext'; 

export default function App() {
  //initial dummy game-history data
  const [gameHistory, setGameHistory] = useState(
    sortGameHistory([
      { loser: "John", winner: "David", count: 9, date: new Date("03-01-2001").toJSON().slice(0,10).replace(/-/g,'/')},
      { loser: "David", winner: "John", count: 4, date: new Date("02-01-2001").toJSON().slice(0,10).replace(/-/g,'/')},
      { loser: "Jan", winner: "Jim", count: 6, date: new Date("03-01-2001").toJSON().slice(0,10).replace(/-/g,'/')},
      { loser: "Laura", winner: "Jesse", count: 8, date: new Date("04-01-2001").toJSON().slice(0,10).replace(/-/g,'/')},
      { loser: "Stavros", winner: "Gregory", count: 5, date: new Date("05-01-2001").toJSON().slice(0,10).replace(/-/g,'/')}
    ]
  )); 

  //callback from Game to update game history when a new game is won
  function addHistory(newResult) {
    const loserId = Object.keys(newResult.players).filter(playerId => newResult.players[playerId] !== newResult.winner)[0];
    
    //sort by latest so new win is first row of scoreboard
    let updatedHistory = sortGameHistory(
      [...gameHistory, {loser: newResult.players[loserId], winner: newResult.winner, count: newResult.turns, date: new Date().toJSON().slice(0,10).replace(/-/g,'/')}]
    );
    
    //update game history state, passed as value for GameHistoryContext
    setGameHistory(updatedHistory);
  }

  function sortGameHistory(history){
    return history.sort((a,b)=>{
      if(a.date.valueOf() > b.date.valueOf()) return -1;
      if(b.date.valueOf() > a.date.valueOf()) return 1;
      return 0
    });
  }

  return (
    //pass game history through for access in children (i.e. scoreboard)
    <GameHistoryContext.Provider value={gameHistory}>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Game addHistory={(value) => addHistory(value)}/>} />
                <Route exact path="/scoreboard" element={<Scoreboard />} />
            </Routes>
        </BrowserRouter>
    </GameHistoryContext.Provider>
  );
}
