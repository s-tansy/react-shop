
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
export default function ProductDetail() {

    const { id } = useParams();
    const { state } = useLocation();//用来获取当前页面的路由信息，包括路径、查询参数、state 数据等
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const { productObj } = state || {};
    const [product, setProduct] = useState(productObj);

    useEffect(() => {
        if (!product) {
            fetch(`http://localhost:3001/products/${id}`)
                .then(res => res.json())
                .then(data => setProduct(data));
        }
    }, [id, product]);

    const handleAddToCart = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        addToCart(product);
    }

    if (!product) return <div className="p-6">加载中...</div>;

    return (
        <div className="p-6">
            <h1 className="text-xl">商品详情（ID: {id}）</h1>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-600 mb-4">￥{product.price}</p>
            <button
                onClick={() => handleAddToCart()}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                加入购物车
            </button>
        </div>
    );
}
