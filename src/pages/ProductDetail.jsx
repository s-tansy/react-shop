
import { useParams, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function ProductDetail() {

    const { id } = useParams();
    const { state } = useLocation();//用来获取当前页面的路由信息，包括路径、查询参数、state 数据等
    const { product } = state || {};
    const { addToCart } = useCart();

    if (!product) {
        return <div className="p-6 text-red-500">找不到商品数据</div>;
    }
    // return (
    //     <div className="p-4">
    //         <h1 className="text-xl">商品详情（ID: {id}）</h1>
    //         {/* TODO: 后续接入商品详情 */}
    //     </div>
    // );

    return (
        <div className="p-6">
            <h1 className="text-xl">商品详情（ID: {id}）</h1>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-600 mb-4">￥{product.price}</p>
            <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                加入购物车
            </button>
        </div>
    );
}
