// components/ProductCard.js
export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img
        src="/detachment.jpg"
        alt={product.name}
        className="w-full h-48 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Добавить в корзину
      </button>
    </div>
  );
}
