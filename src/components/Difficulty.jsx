import React, { useState } from 'react'
import Popup from 'reactjs-popup'
function Difficulty({ setGameOver, setLevel }) {
    const [appear, setAppear] = useState(true);
    const highscore = [localStorage.getItem(4000), localStorage.getItem(3000), localStorage.getItem(2000), localStorage.getItem(1500)]
    const setDifficulty = (e) => {
        setLevel(e)
        setAppear(false)
        setGameOver(false)
    }
    return (
        <div>
            <Popup open={appear} modal closeOnDocumentClick={false}>
                <div className='Modal'>
                    <div>
                        <div className='DifficultyTitle'>
                            Select Difficulty
                        </div>
                        <div className='DifficultyDiv'>
                            <div className='DifficultyButton' onClick={() => setDifficulty(4000)}>
                                <section className='DifficultyName'>
                                    Easy
                                </section>
                                <div className='DifficultyScore'>
                                    <u>Highscore</u>
                                    <br />
                                    {highscore[0] != undefined ? (highscore[0]) : (0)}
                                </div>
                            </div>
                            <div className='DifficultyButton' onClick={() => setDifficulty(3000)}>
                                <section className='DifficultyName'>
                                    Medium
                                </section>
                                <div className='DifficultyScore'>
                                    <u>Highscore</u>
                                    <br />
                                    {highscore[1] != undefined ? (highscore[1]) : (0)}
                                </div>
                            </div>
                            <div className='DifficultyButton' onClick={() => setDifficulty(2000)}>
                                <section className='DifficultyName'>
                                    Hard
                                </section>
                                <div className='DifficultyScore'>
                                    <u>Highscore</u>
                                    <br />
                                    {highscore[2] != undefined ? (highscore[2]) : (0)}
                                </div>
                            </div>
                            <div className='DifficultyButton' onClick={() => setDifficulty(1500)}>
                                <section className='DifficultyName'>
                                    Expert
                                </section>
                                <div className='DifficultyScore'>
                                    <u>Highscore</u>
                                    <br />
                                    {highscore[3] != undefined ? (highscore[3]) : (0)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}


export default Difficulty 