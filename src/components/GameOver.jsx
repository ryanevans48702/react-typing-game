import React, { useState } from 'react'
import Popup from 'reactjs-popup'

function GameOver({ restart, score }) {
    const [appear, setAppear] = useState(false);

    const restartLevel = () => {
        window.location.reload(false);
    }
    return (
        <div>
            <Popup open={restart} modal closeOnDocumentClick={false}>
                <div className='Modal'>
                    <div className='RestartDiv'>
                        <div className='DifficultyTitle'>
                            Game Over
                        </div>
                        <div className='ScoreDiv'>
                            Score: {score}
                        </div>
                        <div className='RestartButtonDiv'>
                        <button onClick={() => restartLevel()} className='RestartButton'>Restart</button>
                        </div>
                    
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default GameOver