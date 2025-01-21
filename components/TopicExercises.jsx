"use client";

import React, { useEffect, useState } from "react";

const TopicExercises = ({ topicId }) => {
  const [topics, setTopics] = useState([]);
  const [openQuestionId, setOpenQuestionId] = useState(null);
  // Функция переключения отображения ответа

  // Fetch topics data from the public directory
  {
    topicId &&
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

        fetchTopics();
      }, []);
  }

  const topic = topics.find((topic) => topic.id === topicId);
  {
    topic && console.log(topic);
  }

  const toggleAnswer = (id) => {
    setOpenQuestionId((prevId) => (prevId === id ? null : id)); // Переключение
  };

  // const [userAnswers, setUserAnswers] = useState({});

  // const handleInputChange = (id, value) => {
  //   setUserAnswers((prev) => ({
  //     ...prev,
  //     [id]: value,
  //   }));
  // };

  // const checkAnswer = (id, correctAnswer) => {
  //   const userAnswer = userAnswers[id] || "";
  //   return (
  //     userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
  //   );
  // };

  const [userAnswers, setUserAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});

  const handleInputChange = (id, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleShowAnswer = (id) => {
    setShowAnswers((prev) => ({
      ...prev,
      [id]: !prev[id], // Переключение состояния показа ответа
    }));
  };

  const checkAnswer = (id, correctAnswer) => {
    const userAnswer = userAnswers[id] || "";
    return (
      userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    );
  };

  return (
    <div className="flex flex-col items-center px-4 w-full">
      {/* <div>{topicId}</div>
      <div>
        {topics.map((e) => {
          return <p key={e.id}>{e.id}</p>;
        })}
      </div> */}
      {topic && (
        <div className="flex flex-col gap-8 items-center w-full">
          <h2 className="sm:text-4xl text-2xl font-semibold">{topic.title}</h2>
          <p className="text-xl sm:text-3xl text-center">{topic.description}</p>
          {/* <div className="text-base sm:text-2xl mt-6 font-light space-y-4">
            {topic.exercises.map((e) => {
              const parts = e.sentence.split("___");
              return (
                <div
                  key={e.id}
                  className="flex justify-between gap-10 items-center pb-2 w-full"
                >
                  <div>
                    <span>{parts[0]}</span>
                    <input className="border rounded-sm bg-inherit lowercase focus:outline-none w-[80px] sm:w-[130px] mx-2" />
                    <span>{parts[1]}</span>

                    <div className="mt-2">
                      {openQuestionId === e.id ? <p>{e.answer}</p> : <p>🔒</p>}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <button className="text-sm text-gray-900 py-2 px-4 rounded-full w-28 bg-gradient-to-t from-green-500 to-green-300 sm:hover:opacity-85 transition-all duration-100 active:opacity-85 shadow-lg">
                      CHECK
                    </button>
                    <button
                      onClick={() => toggleAnswer(e.id)}
                      className="text-sm text-gray-900 py-2 px-4 rounded-full w-28 bg-gradient-to-t from-green-500 to-green-300 sm:hover:opacity-85 transition-all duration-100 active:opacity-85 shadow-lg"
                    >
                      SHOW
                    </button>
                  </div>
                </div>
              );
            })}
          </div> */}
          <div className="text-base sm:text-2xl mt-6 font-light space-y-4">
            {topic.exercises.map((riddle) => {
              const parts = riddle.sentence.split("___");
              return (
                <div
                  key={riddle.id}
                  className="flex justify-between gap-2 sm:gap-10 items-start pb-2 w-full"
                >
                  <div className="relative">
                    {/* <p className="mb-2 text-lg font-medium">{riddle.sentence}</p> */}
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
                            ? "border-green-600" // Плюс
                            : "border-red-500") // Минус
                        } border rounded-sm bg-transparent px-1 lowercase h-6 focus:outline-none w-[80px] mx-2`}
                      />
                      <p className="">{parts[1]}</p>
                    </div>
                    {/* <span className="mr-1">
                        {userAnswers[riddle.id] &&
                          (checkAnswer(riddle.id, riddle.answer) ? (
                            <span className="text-green-500">☑</span> // Плюс
                          ) : (
                            <span className="text-red-500">☒</span> // Минус
                          ))}
                      </span> */}
                    {/* <div className="flex mt-4 w-[90vw] items-center">
                      <span className="truncate">{parts[0]}</span>

                      <input
                        type="text"
                        value={userAnswers[riddle.id] || ""}
                        onChange={(e) =>
                          handleInputChange(riddle.id, e.target.value)
                        }
                        className={`border rounded-sm bg-transparent px-1 lowercase focus:outline-none w-[130px] min-w-[80px] mx-2 ${
                          userAnswers[riddle.id]
                            ? checkAnswer(riddle.id, riddle.answer)
                              ? "border-green-600"
                              : "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      <span className="truncate">{parts[1]}</span>
                    </div> 

                    {showAnswers[riddle.id] ? (
                      <p className="mt-2">{riddle.answer}</p>
                    ) : (
                      <p className="mt-2">🔒</p>
                    )}*/}

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
        </div>
      )}
      {/* {topic && (
        <div className="w-full max-w-md p-4 bg-white rounded shadow">
          {topic.exercises.map((riddle) => (
            <div key={riddle.id} className="mb-4">
              <p className="mb-2 text-lg font-medium">{riddle.sentence}</p>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Ваш ответ"
                  value={userAnswers[riddle.id] || ""}
                  onChange={(e) => handleInputChange(riddle.id, e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none"
                />
                <span className="ml-3 text-xl">
                  {userAnswers[riddle.id] &&
                    (checkAnswer(riddle.id, riddle.answer) ? (
                      <span className="text-green-500">✔</span> // Плюс
                    ) : (
                      <span className="text-red-500">✘</span> // Минус
                    ))}
                </span>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default TopicExercises;
