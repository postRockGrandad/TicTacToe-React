import './Scoreboard.css'
import { Link } from 'react-router-dom';
import { useContext} from 'react';
import { GameHistoryContext } from '../../gameHistoryContext'; 

export function Scoreboard(){
    const gameHistory = useContext(GameHistoryContext);

    return (
        <div className="scoreboardBackground">
            <div className="scoreboardContainer">
                <div className="title">
                    <h1>Scoreboard</h1>
                </div>
                <hr />
                <div className="body">          
                    <table>
                        <thead>
                            <tr>
                                <th>Winner</th>
                                <th>Loser</th>
                                <th>Turns Taken</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...gameHistory].map((row, i) => 
                                <tr key={i}>                   
                                    <td key={i +"_winner"}> 
                                        {row.winner}
                                    </td>                   
                                    <td key={i +"_loser"}> 
                                        {row.loser}
                                    </td>                   
                                    <td key={i +"_count"}> 
                                        {row.count}
                                    </td>                  
                                    <td key={i +"_date"}> 
                                        {row.date.toString().split("00:")[0]}
                                    </td>
                                </tr>                            
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="footer">
                    <div className="controls-container">
                        <Link to="/">
                            <button type="button">
                                Play Game
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}