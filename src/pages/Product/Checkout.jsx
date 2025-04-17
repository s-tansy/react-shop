import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = state || {};
  const { clearCart } = useCart();
  const [address, setAddress] = useState("");
  const { user } = useAuth(); // 获取用户信息

  if (!cartItems) {
    return <div className="p-6 text-red-500">无订单信息</div>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) return alert("请填写地址");
    const orderData = {
      userId: user.id,
      items: cartItems,
      total: totalPrice,
      createdAt: new Date().toISOString(),
      address,
      status: "待发货",
    };

    const res = await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      clearCart();
      //改成一个组件 跳到下单成功页面
      //navigate("/orders");
      navigate("/order-complete");
    }
    else {
      alert("下单失败！请稍后再试。");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">确认订单</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} - ￥{item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p className="font-bold">总价：￥{totalPrice}</p>
      <form onSubmit={handleSubmit}>
        <label>
          收货地址：
          <input
            className="border px-2 py-1 block mt-1"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded" type="submit">
          提交订单
        </button>
      </form>
    </div>
  );
}
