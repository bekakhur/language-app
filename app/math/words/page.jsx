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

  // Обработчик клика по слову в правом поле
  const handleWordClick = (word) => {
    // Проверяем, правильно ли выбрано слово
    if (word === gameWords[droppedWords.length]) {
      setDroppedWords([...droppedWords, word]); // Добавляем слово в массив перетащенных
      setScore(droppedWords.length + 1); // Обновляем счет

      // Удаляем выбранное слово из shuffledWords
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

  return (
    <div className="min-h-screen flex flex-col select-none text-white bg-gray-900 sm:pt-12 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          I Went To The Market And Bought
        </h1>

        {/* Длина списка слов */}
        <div className={!gameOver ? "text-center text-3xl mb-6" : "hidden"}>
          Score:{" "}
          <span className="text-4xl font-bold ml-1">{currentStep + 1}</span>
        </div>

        {/* Сообщение о результате игры */}
        {message && (
          <div
            className={`p-8 m-4 shadow-lg shadow-red-200/10 flex flex-col gap-6 text-white justify-center items-center rounded-lg text-center text-4xl sm:text-5xl font-semibold ${
              gameOver && message.includes("Game")
                ? "bg-gradient-to-t from-red-500 to-red-400 text-gray-900"
                : "bg-green-100 text-green-800"
            }`}
          >
            <p>{message}</p>
            <p className="text-2xl">
              Score:{" "}
              <span className="text-4xl font-bold ml-1">{currentStep + 1}</span>
            </p>
            {gameOver && (
              <div className="flex justify-center">
                <button
                  onClick={startNewGame}
                  className="px-6 py-2 text-xl bg-gradient-to-t from-green-600 to-green-400 text-white rounded-lg shadow-lg sm:hover:bg-green-600 transition-colors"
                >
                  Restart
                </button>
              </div>
            )}
          </div>
        )}

        {/* Две колонки всегда в ряд, но уже */}
        <div className={!gameOver ? "grid grid-row-2 gap-2" : "hidden"}>
          {/* Поле для перетаскивания слов */}
          <div className="p-4 bg-white min-h-24 rounded-lg shadow-lg  border-purple-100">
            <div className="flex flex-wrap gap-2">
              {droppedWords.map((word, index) => (
                <div
                  key={index}
                  className="p-2 w-auto bg-orange-50 text-gray-900 border-[1px] border-black/15 rounded-lg shadow-md text-center"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>

          {/* Поле с перемешанными словами для запоминания */}
          <div className="p-4 bg-white min-h-24 relative rounded-lg shadow-lg border border-purple-100">
            <div className="flex flex-wrap gap-2">
              {!gameOver &&
                shuffledWords.map((word, index) => (
                  <div
                    key={index}
                    onClick={() => handleWordClick(word)} // Обработчик клика
                    className="p-2 w-auto bg-blue-100 text-gray-900 rounded-lg border-[1px] border-black/15 shadow-md text-center cursor-pointer sm:hover:bg-blue-100 active:bg-blue-100 transition-colors"
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
                className="h-6 w-6 rotate-45 opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Кнопка сброса игры */}
      </div>
    </div>
  );
};

export default MemoryGame;
