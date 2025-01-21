"use client";

// Import necessary libraries
import React, { useEffect, useState } from "react";

const TopicsList = () => {
  // State to hold topics data
  const [topics, setTopics] = useState([]);

  // Fetch topics data from the public directory
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

  return (
    <div className="container mx-auto px-6 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        Grammar Topics
      </h1>
      <div className="flex flex-wrap justify-center gap-4 items-center">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="p-4 border w-full max-w-[500px] rounded-lg shadow-sm duration-300 sm:hover:shadow-md transition-shadow"
          >
            <a
              href={`/topic/${topic.id}`}
              className="active:text-green-500 sm:hover:text-green-600"
            >
              <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
              <p className="max-w-[470px] truncate">{topic.description}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsList;
