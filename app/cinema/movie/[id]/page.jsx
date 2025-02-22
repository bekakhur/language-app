"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();
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

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full"
      >
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
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/w7lBleOF9Pw?si=TuJDmveVQfV1xJbY"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-[200px] w-full mt-10"
            ></iframe>
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
