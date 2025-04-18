import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function NavBarCart() {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartProducts = totalCount > 0 ? `(${totalCount})` : "";
    return (
        <>
            <nav className="p-2 px-12 bg-gray-100 flex justify-between items-center text-gray-600 text-sm">
                {/* 左侧：登录/注册 */}
                <div className="flex gap-4">
                    {!user && (
                        <Link to="/login">登录/注册</Link>
                    )}
                </div>

                {/* 右侧：购物车等 */}
                <div className="flex gap-4">
                    {user ? (
                        <>
                            {user.role === "admin" && (
                                <Link to="/admin/products">管理员中心</Link>
                            )}
                            <Link to="/login" onClick={logout}>退出</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/cart">
                                🛒购物车
                                <span className="text-red-500 ml-1">{cartProducts}</span>
                            </Link>
                            <Link to="/register">☆收藏夹</Link>
                            <Link to="/register">用户中心</Link>
                        </>
                    )}
                </div>
            </nav>


        </>
    );
}
