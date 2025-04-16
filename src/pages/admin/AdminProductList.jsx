import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { Navigate, Link } from "react-router-dom";

export default function AdminProductList() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  // 仅允许管理员访问
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("确认删除该商品？")) {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">后台商品管理</h2>

      <Link to="/admin/products/new" className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">
        ➕ 添加新商品
      </Link>

      <ul>
        {products.map((p) => (
          <li key={p.id} className="border p-3 mb-2 flex justify-between">
            <div>
              <strong>{p.name}</strong> - ¥{p.price}
            </div>
            <div className="space-x-2">
              <Link to={`/admin/products/${p.id}`} className="text-blue-600">
                编辑
              </Link>
              <button onClick={() => handleDelete(p.id)} className="text-red-600">
                删除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
