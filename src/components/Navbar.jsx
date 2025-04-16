import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function NavBar() {
    const { user ,logout} = useAuth();
    const { cartItems } = useCart();
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <nav className="p-4 bg-gray-200 flex gap-4">
            <Link to="/">🏠首页</Link>
            {
                user ? (
                    user.role === "user" ? (
                        <>
                            <Link to="/cart" className="text-blue-600">🛒购物车 ({totalCount})</Link>
                            <Link to="/orders">我的订单</Link>
                            <Link to="/user">用户中心</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/admin/products">管理员中心</Link>
                            <Link to="/login" onClick={logout}>退出</Link>
                        </>
                    )
                ) : (
                    <>
                        <Link to="/login">登录</Link>
                        <Link to="/register">注册</Link>
                    </>
                )
            }

        </nav>
    );
}
