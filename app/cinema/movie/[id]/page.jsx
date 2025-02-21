"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

// Моковые данные фильмов
const movies = [
  {
    id: "1",
    title: "Dune: Part Two",
    description: "Эпическое продолжение путешествия Пола Атрейдеса...",
    genre: "Sci-Fi",
    duration: "165 мин",
    image: "/detachment.jpg",
  },
  {
    id: "2",
    title: "Oppenheimer",
    description: "История создания ядерного оружия...",
    genre: "Drama",
    duration: "180 мин",
    image: "/detachment.jpg",
  },
  {
    id: "3",
    title: "Barbie",
    description: "Фильм о приключениях Барби в реальном мире...",
    genre: "Comedy",
    duration: "114 мин",
    image: "/detachment.jpg",
  },
  {
    id: "4",
    title: "Barbie",
    description: "Фильм о приключениях Барби в реальном мире...",
    genre: "Comedy",
    duration: "114 мин",
    image: "/detachment.jpg",
  },
  {
    id: "5",
    title: "Barbie",
    description: "Фильм о приключениях Барби в реальном мире...",
    genre: "Comedy",
    duration: "114 мин",
    image: "/detachment.jpg",
  },
];

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (params?.id) {
      const foundMovie = movies.find((m) => m.id === params.id);
      setMovie(foundMovie);
    }
  }, [params]);

  if (!movie)
    return <p className="text-white text-center mt-10">Загрузка...</p>;

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full"
      >
        {/* Постер и информация */}
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <Image
            src={movie.image}
            width={400}
            height={600}
            alt={movie.title}
            className="w-full md:w-1/2 object-cover"
          />
          <div className="p-6 flex flex-col justify-between">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="text-gray-400">
              {movie.genre} · {movie.duration}
            </p>
            <p className="mt-4">{movie.description}</p>
            <button
              onClick={() => router.push(`/cinema/booking/${movie.id}`)}
              className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 transition rounded-lg text-lg"
            >
              Купить билет
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
