import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = state || {};
  const { clearCart } = useCart(); 

  if (!cartItems) {
    return <div className="p-6 text-red-500">无订单信息</div>;
  }
  const handlePlaceOrder = async () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder = {
      user: "test_user", // 简化处理
      items: cartItems,
      total,
      createdAt: new Date().toISOString(),
    };

    const res = await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });

    if (res.ok) {
      clearCart();
      navigate("/orders");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">确认订单</h2>
      <ul className="mb-4">
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} = ￥{item.price * item.quantity}
          </li>
        ))}
      </ul>
      <button
        onClick={handlePlaceOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        提交订单
      </button>
    </div>
  );
}
