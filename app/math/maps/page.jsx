export default function Home() {
  // Данные о 10 самых больших городах
  const cities = [
    { name: "Tokyo", x: 800, y: 300 }, // Примерные координаты
    { name: "Delhi", x: 700, y: 350 },
    { name: "Shanghai", x: 850, y: 320 },
    { name: "São Paulo", x: 400, y: 500 },
    { name: "Mexico City", x: 250, y: 400 },
    { name: "Cairo", x: 600, y: 380 },
    { name: "Dhaka", x: 750, y: 370 },
    { name: "Mumbai", x: 720, y: 360 },
    { name: "Beijing", x: 820, y: 310 },
    { name: "Osaka", x: 830, y: 300 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        10 Largest Cities in the World
      </h1>
      <div className="w-full max-w-6xl h-[600px] rounded-lg shadow-lg overflow-hidden bg-white">
        <svg viewBox="0 0 1000 500" src="/usa.svg" className="w-full h-full">
          {/* Пример контуров стран */}
          <path
            d="M100,200 ..." // Упрощенные данные для контуров стран
            fill="#EAEAEC"
            stroke="#D6D6DA"
            strokeWidth="1"
          />
          {/* Маркеры для городов */}
          {cities.map((city, index) => (
            <g key={index} transform={`translate(${city.x}, ${city.y})`}>
              <circle r="5" fill="#FF5533" stroke="#FFF" strokeWidth="2" />
              <text
                x="10"
                y="5"
                fontSize="12"
                fill="#5D5A6D"
                fontFamily="system-ui"
              >
                {city.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
