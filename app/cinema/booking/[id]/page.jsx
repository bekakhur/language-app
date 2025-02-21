"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const seats = Array(50).fill(false); // 40 мест (по умолчанию свободные)

export default function TicketBooking() {
  const params = useParams(); // Получаем параметры маршрута
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieId, setMovieId] = useState(null);

  // Ждём params перед рендерингом
  useEffect(() => {
    if (params?.id) {
      setMovieId(params.id);
    }
  }, [params]);

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

  if (!movieId)
    return <p className="text-white text-center mt-10">Загрузка...</p>;

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold">Выбор мест</h1>
      <p className="text-gray-400 mb-6">Фильм #{movieId}</p>

      {/* Экран */}
      <div className="bg-gray-700 w-full max-w-md text-center p-2 rounded-md">
        📽 Экран
      </div>

      {/* Сетка мест */}
      <div className="grid grid-cols-10 gap-2 mt-4">
        {seats.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => toggleSeat(index)}
            className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-bold cursor-pointer transition ${
              selectedSeats.includes(index)
                ? "bg-green-500 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {index + 1}
          </motion.div>
        ))}
      </div>

      {/* Итоговая сумма и кнопка покупки */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 flex justify-between items-center">
        <span className="text-lg">
          Выбрано: {selectedSeats.length} мест · {selectedSeats.length * 20}$
        </span>
        <button
          onClick={handlePurchase}
          className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg text-lg"
        >
          Купить
        </button>
      </div>
    </main>
  );
}
