"use client"; // Указываем, что это клиентский компонент

import { useState, useEffect } from "react";

const words = [
  "apples",
  "bananas",
  "oranges",
  "strawberries",
  "grapes",
  "lettuce",
  "spinach",
  "carrots",
  "potatoes",
  "tomatoes",
  "onions",
  "garlic",
  "bell peppers",
  "cucumbers",
  "broccoli",
  "cauliflower",
  "zucchini",
  "mushrooms",
  "avocados",
  "lemons",
  "limes",
  "blueberries",
  "raspberries",
  "peaches",
  "pears",
  "pineapple",
  "watermelon",
  "cantaloupe",
  "kiwi",
  "mangoes",
  "chicken",
  "beef",
  "pork",
  "salmon",
  "shrimp",
  "eggs",
  "milk",
  "cheese",
  "yogurt",
  "butter",
  "bread",
  "rice",
  "pasta",
  "oatmeal",
  "cereal",
  "flour",
  "sugar",
  "honey",
  "olive oil",
  "peanut butter",
];

// Функция для перемешивания массива
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MemoryGame = () => {
  const [currentStep, setCurrentStep] = useState(1); // Начинаем с шага 1 (два слова)
  const [droppedWords, setDroppedWords] = useState([]); // Перетащенные слова
  const [gameOver, setGameOver] = useState(false); // Состояние завершения игры
  const [message, setMessage] = useState(""); // Сообщение для игрока
  const [shuffledWords, setShuffledWords] = useState([]); // Перемешанные слова для отображения
  const [gameWords, setGameWords] = useState([]); // Слова для текущей игры (случайный порядок)
  const [score, setScore] = useState(0); // Финальный счет

  // При старте игры перемешиваем слова
  useEffect(() => {
    startNewGame();
  }, []);

  // Функция для начала новой игры
  const startNewGame = () => {
    const shuffledGameWords = shuffleArray(words); // Перемешиваем слова
    setGameWords(shuffledGameWords); // Устанавливаем новый порядок слов
    setCurrentStep(1); // Начинаем с шага 1 (два слова)
    setDroppedWords([shuffledGameWords[0]]); // Первое слово уже в левом поле
    setShuffledWords([shuffledGameWords[1]]); // Второе слово остается в правом поле
    setGameOver(false);
    setMessage("");
    setScore(1); // Начинаем с одного правильно перетащенного слова
  };

  // Функция для перехода к следующему шагу
  const nextStep = () => {
    if (currentStep < gameWords.length - 1) {
      setCurrentStep(currentStep + 1); // Увеличиваем шаг
      setDroppedWords([]); // Очищаем поле для перетаскивания
      setShuffledWords(shuffleArray(gameWords.slice(0, currentStep + 2))); // Перемешиваем слова для следующего шага
    } else {
      setMessage(`🎉 You Win! Score: ${words.length}`); // Показываем финальный счет
      setGameOver(true);
    }
  };

  // Обработчик события drop для поля перетаскивания
  const handleDrop = (e) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text/plain");

    // Проверяем, правильно ли перетащено слово
    if (word === gameWords[droppedWords.length]) {
      setDroppedWords([...droppedWords, word]); // Добавляем слово в массив перетащенных
      setScore(droppedWords.length + 1); // Обновляем счет

      // Удаляем перетащенное слово из shuffledWords
      setShuffledWords((prev) => prev.filter((w) => w !== word));

      // Если все слова на текущем шаге перетащены, переходим к следующему шагу
      if (droppedWords.length === currentStep) {
        nextStep();
      }
    } else {
      setMessage(`Game Over`); // Показываем финальный счет
      setGameOver(true);
    }
  };

  // Обработчик события drag over для поля перетаскивания
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br select-none from-purple-100 to-blue-100 sm:pt-12 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-900 mb-8">
          I Went To The Market And Bought
        </h1>

        {/* Длина списка слов */}
        <div
          className={
            !gameOver
              ? "text-center text-2xl font-semibold text-purple-800 mb-6"
              : "hidden"
          }
        >
          Score: {currentStep + 1}
        </div>

        {/* Сообщение о результате игры */}
        {message && (
          <div
            className={`p-4 m-6 h-[200px] shadow-lg flex flex-col gap-4 text-white justify-center items-center rounded-lg text-center text-5xl font-semibold ${
              gameOver && message.includes("Game")
                ? "bg-red-500 text-gray-900"
                : "bg-green-100 text-green-800"
            }`}
          >
            <p>{message}</p>
            <p className="text-2xl">Score: {currentStep + 1}</p>
          </div>
        )}

        {/* Две колонки всегда в ряд, но уже */}
        <div className={!gameOver ? "grid grid-row-2 gap-2" : "hidden"}>
          {/* Поле для перетаскивания слов */}
          <div
            className="p-4 bg-white min-h-24 rounded-lg shadow-lg border border-purple-100"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {/* <h2 className="text-xl font-semibold text-purple-800 mb-4">2</h2> */}
            <div className="flex flex-wrap gap-2">
              {droppedWords.map((word, index) => (
                <div
                  key={index}
                  className="p-2 w-auto bg-purple-50 text-purple-900 rounded-lg shadow-sm text-center"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>

          {/* Поле с перемешанными словами для запоминания */}
          <div className="p-4 bg-white min-h-24 relative rounded-lg shadow-lg border border-purple-100">
            {/* <h2 className="text-xl font-semibold text-blue-800 mb-4">1</h2> */}
            <div className="flex flex-wrap gap-2">
              {!gameOver &&
                shuffledWords.map((word, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", word)
                    }
                    className="p-2 w-auto bg-blue-50 text-blue-900 rounded-lg shadow-sm text-center cursor-move hover:bg-blue-100 transition-colors"
                  >
                    {word}
                  </div>
                ))}
            </div>

            <div
              className={`${
                currentStep === 1 ? " opacity-100" : " opacity-0"
              } transition-all duration-1000 absolute left-0 -translate-x-6 -translate-y-4 top-0`}
            >
              <img
                src="/up-arrow.svg"
                alt=""
                className="h-6 w-6 rotate-45 opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Кнопка сброса игры */}
        {gameOver && (
          <div className="flex justify-center mt-10">
            <button
              onClick={startNewGame}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
