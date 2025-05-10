"use client";

import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import React, { Suspense, useEffect, useMemo, useState, useRef } from "react";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isSignedIn } = useUser();
  const shuffledTopics = useRef(null); // Храним перемешанные темы

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`/main.json?timestamp=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await response.json();

        // Перемешиваем только при первой загрузке
        if (!shuffledTopics.current) {
          shuffledTopics.current = shuffleArray(data.topics);
        }

        // Обновляем состояние в зависимости от авторизации
        setTopics(
          isSignedIn
            ? shuffledTopics.current
            : shuffledTopics.current.slice(0, 8)
        );
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, [isSignedIn]); // Обновляем только при изменении авторизации

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [topics, searchTerm]);

  return (
    <>
      <Suspense>
        <Header />
        <div className="container mx-auto px-6 space-y-8 min-h-screen mb-12">
          {/* Остальной код остается без изменений */}
          <div className="flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl mt-10 font-bold text-center">
              Grammar Topics
            </h1>
            <div className="flex items-center rounded-lg px-2 py-1 mt-4 border">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 50 50"
                fill="currentColor"
                className="size-5 opacity-60"
              >
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search topics..."
                className="text-base ml-4 w-ful bg-transparent focus:outline-none max-w-[300px]"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 items-center">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-4 border w-full max-w-[500px] rounded-lg shadow-sm duration-300 sm:hover:shadow-md transition-shadow"
                >
                  <a
                    href={`/topic/${topic.id}`}
                    className="active:text-green-500 sm:hover:text-green-600"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      {topic.title}
                    </h2>
                    <p className="max-w-[470px] truncate">
                      {topic.description}
                    </p>
                  </a>
                </div>
              ))
            ) : (
              <p className="text-center text-xl">Loading...</p>
            )}
          </div>
          <SignedOut>
            {filteredTopics.length > 0 && (
              <div className="flex justify-center">
                <SignInButton mode="modal">
                  <button className="px-6 py-4 mt-4 mb-10 sm:mt-8 rounded-lg border shadow-sm uppercase">
                    Subscribe for more
                  </button>
                </SignInButton>
              </div>
            )}
          </SignedOut>
        </div>
      </Suspense>
    </>
  );
};

export default TopicsList;
