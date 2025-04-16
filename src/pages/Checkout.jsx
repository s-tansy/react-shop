import { useLocation } from "react-router-dom";

export default function Checkout() {
  const { state } = useLocation();
  const { cartItems, totalPrice } = state || {};

  if (!cartItems) {
    return <div className="p-6 text-red-500">无订单信息</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">✅ 订单已生成</h1>
      <p className="text-gray-600 mb-4">以下是你的订单内容：</p>

      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between border-b py-2">
          <span>{item.name} x {item.quantity}</span>
          <span>￥{item.price * item.quantity}</span>
        </div>
      ))}

      <div className="text-right text-xl font-bold mt-4">
        总价：￥{totalPrice}
      </div>

      <div className="mt-6 text-green-600 font-semibold">
        🎉 模拟支付成功！感谢购买！
      </div>
    </div>
  );
}
