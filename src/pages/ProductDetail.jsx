
import { useParams } from "react-router-dom";
export default function ProductDetail() {
    const { id } = useParams();

    return (
        <div className="p-4">
            <h1 className="text-xl">商品详情（ID: {id}）</h1>
            {/* TODO: 后续接入商品详情 */}
        </div>
    );
}
