// pages/index.js

import ProductCard from "./components/ProductCard";

export default function Home() {
  // Пример данных о товарах
  const products = [
    {
      id: 1,
      name: "Товар 1",
      description: "Описание товара 1",
      price: 100,
      image: "/images/product1.jpg",
    },
    {
      id: 2,
      name: "Товар 2",
      description: "Описание товара 2",
      price: 200,
      image: "/images/product2.jpg",
    },
    {
      id: 3,
      name: "Товар 3",
      description: "Описание товара 3",
      price: 300,
      image: "/detachment.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto p-4 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Популярные товары</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
