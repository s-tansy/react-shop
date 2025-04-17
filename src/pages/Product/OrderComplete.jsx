import {  Link } from "react-router-dom";
export default function OrderComplete() {

    return (
        <div className="p-6">
            <div className="border p-4 mb-2">
                <Link to="/" className="text-blue-500">完成</Link>
            </div>
            <div className="border p-4 mb-2">
                <Link to="/orders" className="text-blue-500">查看我的订单</Link>
            </div>

        </div>
    );
}
