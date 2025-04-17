import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
   const { addToCart } = useCart();
    const { user } = useAuth();

   const handleAddToCart = (e) => {
    console.log("handleAddToCart", product);
    e.stopPropagation();
    if (!user) {
        navigate("/login");
        return;
    }
    addToCart(product);
}

  return (
    <div
      className="border rounded-xl p-2 shadow hover:shadow-lg cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
    >
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h2 className="mt-2 font-semibold">{product.description}</h2>
      <div className="flex justify-between items-center mt-2">
         <p className="text-green-600 font-bold">¥{product.price}</p>
      <button onClick={handleAddToCart} className="text-black px-4 py-2 rounded" > + </button>
      </div>
     
      <p className="text-gray-500">{product.shop}</p>
      
    </div>
  );
}