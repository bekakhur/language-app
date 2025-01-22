// "use client";

// import React, { useEffect, useState } from "react";

// const TopicExercises = ({ topicId }) => {
//   const [topics, setTopics] = useState([]);
//   const [openQuestionId, setOpenQuestionId] = useState(null);
//   // Функция переключения отображения ответа

//   // Fetch topics data from the public directory
//   {
//     topicId &&
//       useEffect(() => {
//         const fetchTopics = async () => {
//           try {
//             const response = await fetch("/topics.json");
//             const data = await response.json();
//             setTopics(data.topics);
//           } catch (error) {
//             console.error("Error fetching topics:", error);
//           }
//         };

//         fetchTopics();
//       }, []);
//   }

//   const topic = topics.find((topic) => topic.id === topicId);
//   {
//     topic && console.log(topic);
//   }

//   const toggleAnswer = (id) => {
//     setOpenQuestionId((prevId) => (prevId === id ? null : id)); // Переключение
//   };

//   const [userAnswers, setUserAnswers] = useState({});
//   const [showAnswers, setShowAnswers] = useState({});

//   const handleInputChange = (id, value) => {
//     setUserAnswers((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleShowAnswer = (id) => {
//     setShowAnswers((prev) => ({
//       ...prev,
//       [id]: !prev[id], // Переключение состояния показа ответа
//     }));
//   };

//   const checkAnswer = (id, correctAnswer) => {
//     const userAnswer = userAnswers[id] || "";
//     return (
//       userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
//     );
//   };

//   return (
//     <div className="flex flex-col items-center px-4 w-full">
//       {topic && (
//         <div className="flex flex-col gap-8 items-center w-full">
//           <h2 className="sm:text-4xl text-2xl font-semibold">{topic.title}</h2>
//           <p className="text-xl sm:text-3xl text-center">{topic.description}</p>
//           <div className="text-base sm:text-2xl mt-6 font-light space-y-4">
//             {topic.exercises.map((riddle) => {
//               const parts = riddle.sentence.split("___");
//               return (
//                 <div
//                   key={riddle.id}
//                   className="flex justify-between gap-2 sm:gap-10 items-start pb-2 w-full"
//                 >
//                   <div className="relative">
//                     <div className="flex flex-wrap">
//                       <p className="">{parts[0]}</p>

//                       <input
//                         type="text"
//                         value={userAnswers[riddle.id] || ""}
//                         onChange={(e) =>
//                           handleInputChange(riddle.id, e.target.value)
//                         }
//                         className={`${
//                           userAnswers[riddle.id] &&
//                           (checkAnswer(riddle.id, riddle.answer)
//                             ? "border-green-600" // Плюс
//                             : "border-red-500") // Минус
//                         } border rounded-sm bg-transparent px-1 lowercase focus:outline-none w-[80px] sm:w-[130px] mx-2`}
//                       />
//                       <p className="">{parts[1]}</p>
//                     </div>

//                     {showAnswers[riddle.id] ? (
//                       <p className="mt-2">{riddle.answer}</p>
//                     ) : (
//                       <p className="mt-2">🔒</p>
//                     )}
//                   </div>
//                   <div className="flex flex-col md:flex-row gap-4">
//                     <button
//                       onClick={() => handleShowAnswer(riddle.id)}
//                       className="text-sm top-0 text-gray-900 py-2 px-4 rounded-full w-20 sm:w-28 bg-gradient-to-t from-green-500 to-green-300 sm:hover:opacity-85 transition-all focus:outline-none active:outline-none duration-100 active:opacity-85 shadow-lg"
//                     >
//                       {showAnswers[riddle.id] ? "HIDE" : "SHOW"}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TopicExercises;

"use client";

import React, { useEffect, useState } from "react";

const TopicExercises = ({ topicId }) => {
  const [topics, setTopics] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [progress, setProgress] = useState({});
  const [showAnswers, setShowAnswers] = useState({});

  // Загрузка данных о темах и прогрессе
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/topics.json");
        const data = await response.json();
        setTopics(data.topics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    const loadProgress = () => {
      const savedProgress = localStorage.getItem("exerciseProgress");
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    };

    // Подгружаем прогресс из localStorage
    loadProgress();

    // Загружаем темы
    fetchTopics();
  }, []);

  const topic = topics.find((topic) => topic.id === topicId);

  // Сохранение прогресса в localStorage
  useEffect(() => {
    if (topicId) {
      localStorage.setItem("exerciseProgress", JSON.stringify(progress));
    }
  }, [progress, topicId]);

  // Проверка ответа
  const checkAnswer = (id, correctAnswer) => {
    const userAnswer = userAnswers[id] || "";
    return (
      userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    );
  };

  // Обновление прогресса
  const updateProgress = () => {
    if (!topic) return;

    const completedExercises = topic.exercises.filter((exercise) =>
      checkAnswer(exercise.id, exercise.answer)
    ).length;

    setProgress((prev) => ({
      ...prev,
      [topicId]: completedExercises,
    }));
  };

  // Обработчик изменения ввода
  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Обработчик показа правильного ответа
  const handleShowAnswer = (id) => {
    setShowAnswers((prev) => ({
      ...prev,
      [id]: !prev[id], // Переключение состояния показа ответа
    }));
  };

  // Пересчет прогресса после каждого изменения ответа
  useEffect(() => {
    updateProgress();
  }, [userAnswers]);

  return (
    <div className="flex mt-10 flex-col overflow-hidden overscroll-none min-h-screen transition-all duration-1000 items-center px-4 w-full">
      {topic ? (
        <div className="flex flex-col gap-8 items-center w-full">
          <h2 className="sm:text-4xl text-2xl font-semibold">{topic.title}</h2>
          <p className="text-xl sm:text-3xl text-center">{topic.description}</p>
          <div className="text-base sm:text-2xl mt-6 font-light space-y-4">
            {topic.exercises.map((riddle) => {
              const parts = riddle.sentence.split("___");
              return (
                <div
                  key={riddle.id}
                  className="flex justify-between gap-2 sm:gap-10 items-start pb-2 w-full"
                >
                  <div className="relative">
                    <div className="flex flex-wrap">
                      <p className="">{parts[0]}</p>
                      <input
                        type="text"
                        value={userAnswers[riddle.id] || ""}
                        onChange={(e) =>
                          handleInputChange(riddle.id, e.target.value)
                        }
                        className={`${
                          userAnswers[riddle.id] &&
                          (checkAnswer(riddle.id, riddle.answer)
                            ? "border-green-600"
                            : "border-red-500")
                        } border rounded-sm bg-transparent px-1 lowercase focus:outline-none w-[80px] sm:w-[130px] mx-2`}
                      />
                      <p className="">{parts[1]}</p>
                    </div>
                    {/* Показ правильного ответа */}
                    {showAnswers[riddle.id] ? (
                      <p className="mt-2">{riddle.answer}</p>
                    ) : (
                      <p className="mt-2">🔒</p>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <button
                      onClick={() => handleShowAnswer(riddle.id)}
                      className="text-sm top-0 text-gray-900 py-2 px-4 rounded-full w-20 sm:w-28 bg-gradient-to-t from-green-500 to-green-300 sm:hover:opacity-85 transition-all focus:outline-none active:outline-none duration-100 active:opacity-85 shadow-lg"
                    >
                      {showAnswers[riddle.id] ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full fixed hidden sm:flex top-0">
            <div className="w-full bg-gray-100 h-1 sm:h-2 rounded">
              <div
                className="bg-green-500 transition-all duration-500 h-1 sm:h-2 rounded"
                style={{
                  width: `${
                    ((progress[topicId] || 0) / topic.exercises.length) * 100
                  }%`,
                }}
              ></div>
            </div>
            {/* <p className="text-sm mt-2 text-gray-600">
              {progress[topicId] || 0}/{topic.exercises.length} COMPLETED
            </p> */}
          </div>
        </div>
      ) : (
        <p className="text-center opacity-70 text-xl">Loading exercises...</p>
      )}
    </div>
  );
};

export default TopicExercises;
