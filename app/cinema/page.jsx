"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Фильмы
const movies = [
  { id: 1, title: "Dune: Part Two", genre: "Sci-Fi", image: "/detachment.jpg" },
  { id: 2, title: "Oppenheimer", genre: "Drama", image: "/detachment.jpg" },
  { id: 3, title: "Barbie", genre: "Comedy", image: "/detachment.jpg" },
  { id: 4, title: "The Batman", genre: "Action", image: "/detachment.jpg" },
  { id: 5, title: "Interstellar", genre: "Sci-Fi", image: "/detachment.jpg" },
];

const genres = ["Все", ...new Set(movies.map((m) => m.genre))];

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("Все");
  const filteredMovies =
    selectedGenre === "Все"
      ? movies
      : movies.filter((m) => m.genre === selectedGenre);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "/detachment.jpg" }}
      >
        <div className="bg-black/50 w-full h-full flex flex-col items-center justify-center p-6">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Добро пожаловать в CineX
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 mt-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Погрузись в мир кино и купи билеты онлайн
          </motion.p>
          <motion.a
            href="#movies"
            className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 transition rounded-lg text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Смотреть фильмы
          </motion.a>
        </div>
      </section>

      {/* Карусель */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Популярные фильмы
        </h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{ 768: { slidesPerView: 3 } }}
          navigation
          autoplay={{ delay: 6000 }}
          loop
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <a href={`/cinema/movie/${movie.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 p-4 rounded-xl shadow-lg"
                >
                  <Image
                    src={movie.image}
                    width={500}
                    height={300}
                    alt={movie.title}
                    className="rounded-lg"
                  />
                  <h3 className="text-xl font-bold mt-4">{movie.title}</h3>
                </motion.div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Фильтрация по жанрам */}
      <section className="container mx-auto py-8 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Сейчас в кино
        </h2>
        <div className="flex justify-center space-x-4 mb-6">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedGenre === genre
                  ? "bg-red-500"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Фильмы */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-4 rounded-xl shadow-lg"
            >
              <a href={`/cinema/movie/${movie.id}`}>
                <Image
                  src={movie.image}
                  width={500}
                  height={300}
                  alt={movie.title}
                  className="rounded-lg"
                />
              </a>
              <h3 className="text-xl font-bold mt-4">{movie.title}</h3>
              <a
                href={`/cinema/booking/${movie.id}`}
                className="mt-4 inline-block px-4 py-2 bg-red-500 hover:bg-red-600 transition rounded-lg"
              >
                Купить билет
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
