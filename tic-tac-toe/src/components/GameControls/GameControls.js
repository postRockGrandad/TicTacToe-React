import './GameControls.css'

export function GameControls(props){
    return (
        <div className="controls-container">
            <button>View Scoreboard</button>
            {props.winner && <button className='blue' onClick={()=>{props.resetClicked()}}>Reset Game</button>}
        </div>
    )
}