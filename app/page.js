// "use client";

// // Import necessary libraries
// import React, { useEffect, useMemo, useState } from "react";

// const TopicsList = () => {
//   // State to hold topics data
//   const [topics, setTopics] = useState([]);

//   // Fetch topics data from the public directory
//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const response = await fetch("/topics.json");
//         const data = await response.json();
//         setTopics(data.topics);
//       } catch (error) {
//         console.error("Error fetching topics:", error);
//       }
//     };

//     fetchTopics();
//   }, []);

//   const shuffled = useMemo(() => {
//     if (topics && topics.length > 0) {
//       return [...topics].sort(() => Math.random() - 0.5);
//     }
//     return []; // Если data нет или пустой, возвращаем пустой массив
//   }, [topics]);

//   console.log(shuffled);

//   return (
//     <div className="container mx-auto px-6 min-h-screen">
//       <h1 className="text-2xl sm:text-3xl mt-10 font-bold text-center mb-8">
//         Grammar Topics
//       </h1>
//       <div className="flex flex-wrap justify-center gap-4 items-center">
//         {shuffled.map((topic) => (
//           <div
//             key={topic.id}
//             className="p-4 border w-full max-w-[500px] rounded-lg shadow-sm duration-300 sm:hover:shadow-md transition-shadow"
//           >
//             <a
//               href={`/topic/${topic.id}`}
//               className="active:text-green-500 sm:hover:text-green-600"
//             >
//               <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
//               <p className="max-w-[470px] truncate">{topic.description}</p>
//             </a>
//           </div>
//         ))}
//         <button className="px-6 py-4 mt-4 sm:mt-8 rounded-lg border shadow-sm uppercase">
//           Subscribe for more
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopicsList;

// "use client";

// import Header from "@/components/Header";
// import React, { useEffect, useState } from "react";

// const TopicsList = () => {
//   const [topics, setTopics] = useState([]);
//   const [progress, setProgress] = useState({}); // Хранение прогресса

//   // Получение данных о темах и прогрессе
//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const response = await fetch("/topics.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setTopics(data.topics);
//       } catch (error) {
//         console.error("Ошибка при загрузке данных о темах:", error);
//       }
//     };

//     // Загрузка прогресса из localStorage
//     const loadProgress = () => {
//       const savedProgress = localStorage.getItem("exerciseProgress");
//       if (savedProgress) {
//         setProgress(JSON.parse(savedProgress));
//       }
//     };

//     fetchTopics();
//     loadProgress();
//   }, []);

//   // Сохранение прогресса в localStorage при изменении
//   useEffect(() => {
//     localStorage.setItem("exerciseProgress", JSON.stringify(progress));
//   }, [progress]);

//   // Функция для обновления прогресса
//   const updateProgress = (topicId, totalExercises) => {
//     setProgress((prev) => ({
//       ...prev,
//       [topicId]: Math.min((prev[topicId] || 0) + 1, totalExercises),
//     }));
//   };

//   return (
//     <div className=" min-h-screen">
//       <Header />
//       <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
//         Grammar Topics
//       </h1>
//       <div className="flex flex-wrap justify-center gap-4 px-6 items-center">
//         {topics.length > 0 ? (
//           topics.map((topic) => {
//             const completed = progress[topic.id] || 0; // Количество завершенных упражнений
//             const percentage = Math.round(
//               (completed / topic.exercises.length) * 100
//             ); // Процент прогресса

//             return (
//               <div
//                 key={topic.id}
//                 className="p-4 border w-full max-w-[500px] rounded-lg shadow-sm duration-300 sm:hover:shadow-md transition-shadow"
//               >
//                 <a
//                   href={`/topic/${topic.id}`}
//                   className="active:text-green-500 sm:hover:text-green-600"
//                 >
//                   <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
//                   <p className="max-w-[470px] truncate">{topic.description}</p>
//                 </a>
//                 <div className="mt-4 flex gap-8 items-end">
//                   <div className="w-full mb-[6px] bg-gray-100 h-2 rounded">
//                     <div
//                       className="bg-green-500 h-2 rounded"
//                       style={{ width: `${percentage}%` }}
//                     ></div>
//                   </div>
//                   <p className="text-xl mr-4">
//                     {completed}/{topic.exercises.length}
//                   </p>
//                 </div>
//                 {/* <button
//                   onClick={() =>
//                     updateProgress(topic.id, topic.exercises.length)
//                   }
//                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   RESET
//                 </button> */}
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center text-xl">Loading topics...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TopicsList;
// "use client";

// import Header from "@/components/Header";
// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";

// const TopicsList = () => {
//   const [topics, setTopics] = useState([]);
//   const [progress, setProgress] = useState({});
//   const [key, setKey] = useState(0); // Динамический ключ для перерендера
//   const router = useRouter();

//   // Функция для загрузки данных
//   const fetchData = useCallback(() => {
//     const fetchTopics = async () => {
//       try {
//         // Добавляем уникальный параметр timestamp, чтобы запрос не кэшировался
//         const response = await fetch(`/topics.json?timestamp=${Date.now()}`, {
//           cache: "no-store",
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setTopics(data.topics);
//       } catch (error) {
//         console.error("Ошибка при загрузке данных о темах:", error);
//       }
//     };

//     const loadProgress = () => {
//       const savedProgress = localStorage.getItem("exerciseProgress");
//       if (savedProgress) {
//         setProgress(JSON.parse(savedProgress));
//       }
//     };

//     fetchTopics();
//     loadProgress();
//   }, []);

//   // Загружаем данные при первой загрузке компонента
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // Обновляем компонент при возврате назад
//   useEffect(() => {
//     const handlePopState = () => {
//       setKey((prevKey) => prevKey + 1); // Увеличиваем ключ, чтобы компонент перерисовался
//     };

//     window.addEventListener("popstate", handlePopState);

//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, []);

//   // Сохраняем прогресс в localStorage при его изменении
//   useEffect(() => {
//     localStorage.setItem("exerciseProgress", JSON.stringify(progress));
//   }, [progress]);

//   const updateProgress = (topicId, totalExercises) => {
//     setProgress((prev) => ({
//       ...prev,
//       [topicId]: Math.min((prev[topicId] || 0) + 1, totalExercises),
//     }));
//   };

//   return (
//     <div key={key} className="min-h-screen">
//       <Header />
//       <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
//         Grammar Topics
//       </h1>
//       <div className="flex flex-wrap justify-center gap-4 px-6 items-center">
//         {topics.length > 0 ? (
//           topics.map((topic) => {
//             const completed = progress[topic.id] || 0;
//             const percentage = Math.round(
//               (completed / topic.exercises.length) * 100
//             );

//             return (
//               <div
//                 key={topic.id}
//                 className="p-4 border w-full max-w-[500px] rounded-lg shadow-sm duration-300 sm:hover:shadow-md transition-shadow"
//               >
//                 <a
//                   href={`/topic/${topic.id}`}
//                   className="active:text-green-500 sm:hover:text-green-600"
//                 >
//                   <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
//                   <p className="max-w-[470px] truncate">{topic.description}</p>
//                 </a>
//                 <div className="mt-4 flex gap-8 items-end">
//                   <div className="w-full mb-[6px] bg-gray-100 h-2 rounded">
//                     <div
//                       className="bg-green-500 h-2 rounded"
//                       style={{ width: `${percentage}%` }}
//                     ></div>
//                   </div>
//                   <p className="text-xl mr-4">
//                     {completed}/{topic.exercises.length}
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center text-xl">Loading topics...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TopicsList;

"use client";

import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
// Import necessary libraries
import React, { Suspense, useEffect, useMemo, useState } from "react";

const TopicsList = () => {
  // State to hold topics data
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const { isSignedIn } = useUser();

  // Fetch topics data from the public directory
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`/main.json?timestamp=${Date.now()}`, { cache: 'no-store' });
        const data = await response.json();
        if (isSignedIn) {
          setTopics(data.topics);
        } else {
          setTopics(data.topics.slice(0, 8));
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
  
    fetchTopics();
  }, [isSignedIn]);

  // Shuffle topics
  const shuffled = useMemo(() => {
    if (topics && topics.length > 0) {
      return [...topics].sort(() => Math.random() - 0.5);
    }
    return []; // Если data нет или пустой, возвращаем пустой массив
  }, [topics]);

  // Filter topics based on the search term
  const filteredTopics = useMemo(() => {
    return shuffled.filter((topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [shuffled, searchTerm]);

  return (
    <>
      <Suspense>
        <Header />
        <div className="container mx-auto px-6 space-y-8 min-h-screen mb-12">
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
                  className="p-4 border w-full max-w-[500px] rounded-lg   shadow-sm duration-300 sm:hover:shadow-md transition-shadow"
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
