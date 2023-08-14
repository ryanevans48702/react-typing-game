import React, { useState, useEffect } from 'react';
import './App.css';
import Word from './components/Word';
import Heart from './components/Heart';
import Difficulty from './components/Difficulty';
import GameOver from './components/GameOver';
import { generate } from "random-words";

function App() {
  const [inputValue, setInputValue] = useState('');
  const [wordArray, setWordArray] = useState([]);
  const [level, setLevel] = useState(5000);
  const [score, setScore] = useState(0)
  const [health, setHealth] = useState(3)
  const [gameOver, setGameOver] = useState(true);
  const [restart, setRestart] = useState(false);
  const keysToIgnore = ['Shift', 'Alt', 'Meta', 'CapsLock', 'Control', 'Tab', 'Escape', 'ControlAltGraph', 'AltGraph', 'ContextMenu', 'ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'End', 'PageDown', 'Home', 'PageUp', 'Insert', 'ScrollLock', 'Pause'];

  const checkInput = () => {
    try {
      if (inputValue.toLowerCase() === wordArray[0].text.toLowerCase()) {
        setWordArray((prevArray) => prevArray.slice(1));
        setInputValue('');
        setScore((score) => score += 1)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkInput();
  }, [inputValue])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key == 'Backspace' || event.key == 'Delete') {
        setInputValue((inputValue) => inputValue.slice(0, -1))
      } else if (event.key == 'Enter') {
        setInputValue('');
      }
      else if (keysToIgnore.includes(event.key)) {
      }
      else {
        setInputValue((inputValue) => inputValue += event.key)
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) { // Check if game is not over
        const newPosition = Math.min(Math.max(Math.random() * 100, 20), 80);
        setWordArray((prevArray) => [
          ...prevArray,
          {
            id: Date.now(),
            text: generate({ minLength: 6, maxLength: 9 }),
            left: newPosition,
            topPosition: 0
          },
        ]);
        if (health <= 1) { // Check if health is less than or equal to 0
          setGameOver(true);
          clearInterval(interval); // Stop the interval if the game is over
        }
      }
    }, level);

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [gameOver]);


  const deleteSelf = () => {
    setWordArray((prevArray) => prevArray.slice(1));
    setHealth((health) => health -= 1)
  }

  useEffect(() => {
    if (health == 0) {
      deleteAll();
      setGameOver(true);
      setRestart(true);
      updateScore()
    }
  }, [health])

  const updateScore = () => {
    if (localStorage.getItem(level) < score) {
      localStorage.setItem(level, score)
    }
  }

  const deleteAll = () => {
    for (let i = 0; i < wordArray.length; i++) {
      setWordArray((prevArray) => prevArray.slice(1));
    }
  }

  const components = Array.from({ length: health }, (_, index) => (
    <Heart key={index} />
  ));

  return (
    <div>
      <Difficulty setGameOver={setGameOver} setLevel={setLevel}></Difficulty>
      <GameOver restart={restart} score={score}></GameOver>
      <div className='Score'>{score}</div>
      <div className='PlayContainer'>
        <div className='Input'>
          {inputValue}
        </div>
        <div style={{ minHeight: '90px' }}>{components}</div>
      </div>
      {wordArray.map((word) => (
        <Word word={word} key={word.id} deleteSelf={deleteSelf} wordArray={wordArray} inputValue={inputValue} />
      ))}
    </div>
  );
}

export default App;
