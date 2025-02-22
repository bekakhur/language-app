"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Все");
  const [genres, setGenres] = useState(["Все"]);

  useEffect(() => {
    fetch("/movies.json")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMovies(data);
          const uniqueGenres = ["Все", ...new Set(data.map((m) => m.genre))];
          setGenres(uniqueGenres);
        } else {
          console.error("Данные не являются массивом:", data);
        }
      })
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  }, []);

  const filteredMovies =
    selectedGenre === "Все"
      ? movies
      : movies.filter((m) => m.genre === selectedGenre);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/detachment.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
        <div className="relative z-10 max-w-4xl px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Добро пожаловать в CineX
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 mt-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Погрузись в мир кино и наслаждайся лучшими фильмами в одном месте
          </motion.p>
        </div>
      </section>

      {/* Фильтрация по жанрам */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500">
          Сейчас в кино
        </h2>
        <div className="flex justify-center gap-2 sm:gap-6 mb-8 mx-8 flex-wrap">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedGenre === genre
                  ? "bg-gradient-to-r from-red-500 to-purple-500 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Фильмы */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-800 cursor-pointer"
            >
              <Link href={`/cinema/movie/${movie.id}`}>
                <div>
                  <Image
                    src={movie.image}
                    width={500}
                    height={300}
                    alt={movie.title}
                    className="rounded-lg"
                    priority
                  />
                  <h3 className="text-2xl font-bold mt-4">{movie.title}</h3>
                  <p className="text-gray-400 mt-2">{movie.genre}</p>
                </div>
              </Link>
              <Link
                href={`/cinema/booking/${movie.id}`}
                className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 transition-all rounded-full text-lg font-semibold"
              >
                Купить билет
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900/50 backdrop-blur-md mt-16 py-8 text-center">
        <p className="text-gray-400">© 2023 CineX. Все права защищены.</p>
      </footer>
    </main>
  );
}
