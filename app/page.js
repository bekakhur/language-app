// "use client";

// // Import necessary libraries
// import React, { useEffect, useState } from "react";

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

//   return (
//     <div className="container mx-auto px-6 min-h-screen">
//       <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
//         Grammar Topics
//       </h1>
//       <div className="flex flex-wrap justify-center gap-4 items-center">
//         {topics.map((topic) => (
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
"use client";

import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Импортируем useRouter

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState({});
  const router = useRouter(); // Инициализация useRouter

  // Функция для получения данных о темах и прогрессе
  const fetchData = () => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/topics.json", { cache: "no-store" }); // Запрашиваем данные без кэширования
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTopics(data.topics);
      } catch (error) {
        console.error("Ошибка при загрузке данных о темах:", error);
      }
    };

    const loadProgress = () => {
      const savedProgress = localStorage.getItem("exerciseProgress");
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    };

    fetchTopics();
    loadProgress();
  };

  // Перезагружаем данные при изменении маршрута или переходе назад
  useEffect(() => {
    fetchData(); // Загружаем данные заново
  }, [router.asPath]); // Обновляем при изменении маршрута

  // Принудительное обновление данных при изменении маршрута
  useEffect(() => {
    const handlePopState = () => {
      // Перезагружаем страницу при нажатии кнопки "назад"
      router.refresh();
    };

    window.addEventListener("popstate", handlePopState);

    // Очистка слушателя событий при размонтировании компонента
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  // Сохранение прогресса в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("exerciseProgress", JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (topicId, totalExercises) => {
    setProgress((prev) => ({
      ...prev,
      [topicId]: Math.min((prev[topicId] || 0) + 1, totalExercises),
    }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        Grammar Topics
      </h1>
      <div className="flex flex-wrap justify-center gap-4 px-6 items-center">
        {topics.length > 0 ? (
          topics.map((topic) => {
            const completed = progress[topic.id] || 0;
            const percentage = Math.round(
              (completed / topic.exercises.length) * 100
            );

            return (
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
                <div className="mt-4 flex gap-8 items-end">
                  <div className="w-full mb-[6px] bg-gray-100 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xl mr-4">
                    {completed}/{topic.exercises.length}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-xl">Loading topics...</p>
        )}
      </div>
    </div>
  );
};

export default TopicsList;
