import { useState, useEffect } from "react";

// Custom Hook
const useRandomNumberOnSpacePress = (
  min: number,
  max: number
): [number, number[]] => {
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);

  //* Function to generate random number between min and max
  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //* Listen for the spacebar press
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        const newRandomNumber = generateRandomNumber(min, max);
        setRandomNumber(newRandomNumber);
        setHistory((prevHistory) => [...prevHistory, newRandomNumber]);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    //todo: Remove the event listener when the hook is no longer used
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [min, max]);

  return [randomNumber, history];
};

export default useRandomNumberOnSpacePress;
