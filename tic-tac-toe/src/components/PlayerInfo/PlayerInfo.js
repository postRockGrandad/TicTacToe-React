import './PlayerInfo.css'

export function PlayerInfoModal(props) {  
    return (
        <div className="modalBackground">
            <div className="modalContainer">
            <div className="title">
                <h1>Tic Tac Toe with React Hooks</h1>
            </div>
            <hr />
            <div className="body">
                <p>Enter player names:</p>
                <div className="input-container">
                    <label htmlFor="player1Name">Player 1:</label>
                    <input id="player1Name" className="player1" onChange={(event)=>{props.playerNameChange(0, event.target.value);}}/>
                </div>
                <div className="input-container">
                    <label htmlFor="player2Name">Player 2:</label>
                    <input id="player2Name" className="player2" onChange={(event)=>{props.playerNameChange(1, event.target.value);}}/>
                </div>
            </div>
            <div className="footer">
                <button id="playBtn"
                    onClick={() => {
                        props.startGame()
                    }}
                >
                    Play
                </button>
            </div>
            </div>
        </div>
    );
}