import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="border rounded-xl p-2 shadow hover:shadow-lg cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h2 className="mt-2 font-semibold">{product.name}</h2>
      <p className="text-green-600 font-bold">¥{product.price}</p>
    </div>
  );
}
