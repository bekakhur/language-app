"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const seats = Array(30).fill(false); // 30 мест (по умолчанию свободные)

export default function TicketBooking() {
  const params = useParams(); // Получаем параметры маршрута
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (params?.id) {
      fetch("/movies.json")
        .then((response) => response.json())
        .then((data) => {
          // Приводим params.id к числу для корректного сравнения
          const movieId = parseInt(params.id, 10);
          const foundMovie = data.find((m) => m.id === movieId);
          setMovie(foundMovie);
        })
        .catch((error) => {
          console.error("Ошибка загрузки фильмов:", error);
        });
    }
  }, [params]);

  if (!movie)
    return <p className="text-white text-center mt-10">Загрузка...</p>;

  // Обработчик выбора мест
  const toggleSeat = (index) => {
    setSelectedSeats((prev) =>
      prev.includes(index) ? prev.filter((s) => s !== index) : [...prev, index]
    );
  };

  // Функция покупки билета
  const handlePurchase = () => {
    if (selectedSeats.length === 0) return alert("Выберите места!");
    alert(`Билеты куплены на места: ${selectedSeats.join(", ")}`);
    router.push("/cinema");
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6">
      {/* Анимированный фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 animate-gradient"></div>

      {/* Заголовок и информация о фильме */}
      <motion.div
        className="relative z-10 text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500">
          Выбор мест
        </h1>
        <p className="text-gray-400 mt-2">Фильм {movie.title}</p>
      </motion.div>

      {/* Экран */}
      <motion.div
        className="relative z-10 bg-gray-800 w-full max-w-md text-center p-4 rounded-lg shadow-2xl mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="text-xl font-semibold">🎬 Экран</span>
      </motion.div>

      {/* Сетка мест */}
      <motion.div
        className="relative z-10 grid grid-cols-6 gap-2 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {seats.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => toggleSeat(index)}
            className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-bold cursor-pointer transition ${
              selectedSeats.includes(index)
                ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {index + 1}
          </motion.div>
        ))}
      </motion.div>

      {/* Легенда мест */}
      <motion.div
        className="relative z-10 mt-8 flex justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
          <span className="text-gray-400">Свободно</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-sm"></div>
          <span className="text-gray-400">Выбрано</span>
        </div>
      </motion.div>

      {/* Итоговая сумма и кнопка покупки */}
      <motion.div
        className="fixed bottom-0 left-0 w-full bg-gray-900/50 backdrop-blur-md p-4 flex justify-between md:px-40 items-center shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="text-lg">
          Выбрано: {selectedSeats.length} мест · {selectedSeats.length * 20}$
        </span>
        <button
          onClick={handlePurchase}
          className="bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 px-6 py-2 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Купить
        </button>
      </motion.div>
    </main>
  );
}
