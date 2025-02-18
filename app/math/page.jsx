"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [score, setScore] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (gameStarted) {
      setNum1(Math.floor(Math.random() * 90) + 10);
      setNum2(Math.floor(Math.random() * 90) + 10);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted || timeLeft === 0) {
      if (timeLeft === 0) setGameOver(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameStarted]);

  useEffect(() => {
    if (gameOver) return;
    const correctAnswer = num1 + num2;
    if (parseInt(userAnswer) === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setNum1(Math.floor(Math.random() * 90) + 10);
      setNum2(Math.floor(Math.random() * 90) + 10);
      setUserAnswer("");
      setTimeLeft(10);
      inputRef.current?.focus();
    }
  }, [userAnswer, gameOver, num1, num2]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setUserAnswer("");
    setTimeLeft(10);
    inputRef.current?.focus();
  };

  const resetGame = () => {
    setScore(0);
    setNum1(Math.floor(Math.random() * 90) + 10);
    setNum2(Math.floor(Math.random() * 90) + 10);
    setUserAnswer("");
    setTimeLeft(10);
    setGameOver(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-center sm:justify-center pt-24 sm:pt-0 min-h-screen bg-black text-white font-mono p-4">
      {!gameStarted ? (
        <button
          onClick={startGame}
          className="bg-green-500 text-white px-6 py-3 mt-40 sm:mt-0 rounded-lg text-2xl hover:bg-green-600 transition"
        >
          Start Game
        </button>
      ) : gameOver ? (
        <div className="bg-red-500/90 text-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold mb-4">Game Over</h1>
          <p className="text-2xl">Score: {score}</p>
          <button
            onClick={resetGame}
            className="mt-4 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Restart
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-6">Score: {score}</h1>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-2xl mb-4">
              {num1} + {num2} = ?
            </p>
            <p className="text-lg text-gray-400 mb-4">Time left: {timeLeft}s</p>
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="bg-black border border-gray-500 p-2 rounded w-full text-center text-white text-xl focus:outline-none"
              placeholder="Your answer"
            />
          </div>
        </>
      )}
    </div>
  );
}
