import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const { cartItems } = useCart();
const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-gray-100 flex justify-between items-center shadow">
      <Link to="/" className="font-bold text-lg text-gray-800"> 🛍️电商小店</Link>
      <div className="space-x-4">
        <Link to="/" className="text-blue-600">首页</Link>
        <Link to="/user" className="text-blue-600">用户中心</Link>
        <Link to="/cart" className="text-blue-600">🛒购物车 ({totalCount})</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="text-blue-600">登录</Link>
            <Link to="/register" className="text-blue-600">注册</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-red-500">退出登录</button>
        )}
      </div>
    </nav>
  );
}
