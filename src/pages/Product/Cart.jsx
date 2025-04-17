import { useCart } from "../../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();//获取购物车信息

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  //需要增加判断购物车是否为空
  const handleCheckout = () => {
    navigate("/checkout", {
      state: { cartItems, totalPrice },
    });
    clearCart(); // 模拟结算后清空
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">🛒 我的购物车</h1>

      {cartItems.length === 0 ? (
        <>
          <p className="text-gray-500">购物车为空</p>
          <Link to="/">去逛逛商品 →</Link>
        </>

      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">单价：￥{item.price}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-blue-600 font-bold">
                  ￥{item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 underline"
                >
                  删除
                </button>
              </div>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-4">
            总价：￥{totalPrice}
          </div>

          <div className="text-right mt-2">
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              结算
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
