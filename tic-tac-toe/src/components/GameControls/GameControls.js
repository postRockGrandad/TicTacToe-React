import './GameControls.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export function GameControls(props){
    // const nav = useNavigate();
    
    return (
        <div className="controls-container">
             <Link to="/scoreboard">
                <button type="button">
                    View Scoreboard
                </button>
            </Link>
            {/* Link needed instead of useNavigate for shared context to maintain instead of reloading page and SPA */}
            {/* <button onClick={() => nav('/scoreboard')}>View Scoreboard</button> */}
            {props.winner && <button className='blue' onClick={()=>{props.resetClicked()}}>Reset Game</button>}
        </div>
    )
}