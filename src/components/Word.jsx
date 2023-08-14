import React, { useEffect, useState } from "react";

function Word({ word, deleteSelf, inputValue, wordArray }) {
  const [topPosition, setTopPosition] = useState(word.topPosition);
  const [colour, setColour] = useState([]);
  const temp = word.text.split('');
  const [first, setFirst] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTopPosition((prevTop) => Math.min(Math.max(prevTop + 0.1, 0), 100)); // Move the word down by 1% every interval
    }, 10);

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);

  useEffect(() => {
    try {
      if(first === true){
        const temp2 = inputValue.split("");
        const temp3 = [];
        for (let index = 0; index < temp.length; index++) {
          if (temp2[index] === temp[index]) {
            temp3.push("Green");
          } else if (temp2[index] === undefined) {
            temp3.push("White");
          } else {
            temp3.push("Red");
          }
        }
        setColour(temp3);
      }
    } catch (error) {
      console.log(error);
    }

    if (word.text == wordArray[0].text) {
      setFirst(true)
    }
  }, [inputValue]);

  useEffect(() => {

  }, [])


  const reachedBottom = () => {
    if (topPosition >= 90) {
      console.log("Reached Bottom");
      deleteSelf();
    }
  };

  useEffect(() => {
    reachedBottom();
  }, [topPosition]);

  return (
    <div
      style={{ left: `${word.left}%`, top: `${topPosition}%`, position: 'absolute' }}
      className="WordContainer"
    >
      {temp.map((char, index) => (
        <span key={index} className={colour[index]}>
          {char}
        </span>
      ))}
    </div>
  );
}

export default Word;
