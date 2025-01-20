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

  const [inputs, setInputs] = useState({});

  const handleChange = (id, value) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
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
          <h2 className="text-4xl font-semibold">{topic.title}</h2>
          <p className="text-3xl">{topic.description}</p>
          <div className="text-base sm:text-2xl mt-6 font-light space-y-4">
            {topic.exercises.map((e) => {
              const parts = e.sentence.split("___");
              return (
                <div
                  key={e.id}
                  className="flex justify-between gap-10 items-center pb-2 w-full"
                >
                  <div>
                    <span>{parts[0]}</span>
                    <input
                      type="text"
                      onChange={(e) => handleChange(e.id, e.target.value)}
                      className="border-b bg-transparent lowercase focus:outline-none w-[80px] sm:w-[130px] mx-2"
                    />
                    <span>{parts[1]}</span>
                    {/* <p>{e.sentence}</p> */}
                    <div className="mt-2">
                      {openQuestionId === e.id ? <p>{e.answer}</p> : <p>🔒</p>}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <button className="text-sm py-2 px-4 rounded-full w-28 bg-gradient-to-t from-green-500 to-green-300 sm:hover:opacity-85 transition-all duration-100 active:opacity-85 shadow-lg">
                      CHECK
                    </button>
                    <button
                      onClick={() => toggleAnswer(e.id)}
                      className="text-sm py-2 px-4 rounded-full w-28 bg-gradient-to-t from-green-500 to-green-300 sm:hover:opacity-85 transition-all duration-100 active:opacity-85 shadow-lg"
                    >
                      SHOW
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicExercises;
