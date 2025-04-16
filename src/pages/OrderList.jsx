import { useEffect, useState } from "react";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">我的订单</h2>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-2">
          <p className="font-semibold">订单号: {order.id}</p>
          <p>下单时间: {new Date(order.createdAt).toLocaleString()}</p>
          <ul className="text-sm mt-2">
            {order.items.map((item) => (
              <li key={item.id}>{item.name} × {item.quantity}</li>
            ))}
          </ul>
          <p className="mt-1 font-bold">总价：￥{order.total}</p>
        </div>
      ))}
    </div>
  );
}
