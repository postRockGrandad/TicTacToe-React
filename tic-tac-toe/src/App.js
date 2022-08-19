import { React, useState, useEffect } from 'react';
import { Game } from "./components/Game/Game";
import { Scoreboard } from './components/Scoreboard/Scoreboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameHistoryContext } from './gameHistoryContext'; 

export default function App() {
  const [gameHistory, setGameHistory] = useState([
    { loser: "John", winner: "David", count: 9, date: new Date("01-01-2001").toJSON().slice(0,10).replace(/-/g,'/')},
    { loser: "Aidan", winner: "Karen", count: 4, date: new Date("02-01-2001").toJSON().slice(0,10).replace(/-/g,'/')},
    { loser: "Jan", winner: "Jim", count: 6, date: new Date("03-01-2001").toJSON().slice(0,10).replace(/-/g,'/')},
    { loser: "Laura", winner: "Jesse", count: 8, date: new Date("04-01-2001").toJSON().slice(0,10).replace(/-/g,'/')},
    { loser: "Stavros", winner: "Gregory", count: 5, date: new Date("05-01-2001").toJSON().slice(0,10).replace(/-/g,'/')}
  ]);

  

  function addHistory(newResult) {
    const loserId = Object.keys(newResult.players).filter(playerId => newResult.players[playerId] !== newResult.winner)[0];
    let updatedHistory = [...gameHistory, {loser: newResult.players[loserId], winner: newResult.winner, count: newResult.turns, date: new Date().toJSON().slice(0,10).replace(/-/g,'/')}];
    updatedHistory.sort((a,b)=>{
      if(a.date.valueOf() > b.date.valueOf()) return -1;
      if(b.date.valueOf() > a.date.valueOf()) return 1;
      return 0
    });
    setGameHistory(updatedHistory);
  }

  return (
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
