import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function NavBar({ onCategoryClick  }) {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <>
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
            <div className="p-6 space-y-6">
                <nav className="flex gap-4">
                    <button type="button" className="text-xl font-bold" onClick={() => navigate("/product-list")}>推荐</button>
                    <button type="button" className="text-xl font-bold" onClick={() => navigate("/product-list?type=sale")}>🔥 热销</button>
                    <button type="button" 
                            className="text-xl font-bold" 
                            onClick={onCategoryClick}>
                        分类
                    </button>
                    <button type="button" className="text-xl font-bold" onClick={() => navigate("/product-list?type=time-sale")}>🕒秒杀</button>
                </nav>
            </div>
        </>
    );
}
