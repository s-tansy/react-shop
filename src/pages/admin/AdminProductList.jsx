import { useEffect, useState } from "react";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter(p => p.id !== id));
    });
  };

  const handleAdd = () => {
    const newProduct = {
      id: Date.now().toString(), // 临时 ID
      name: newName,
      price: parseFloat(newPrice),
    };
    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    }).then(res => res.json())
      .then(data => {
        setProducts([...products, data]);
        setNewName("");
        setNewPrice("");
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">商品管理</h2>
      
      <div className="mb-4">
        <input
          className="border p-1 mr-2"
          placeholder="商品名"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          className="border p-1 mr-2"
          placeholder="价格"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          type="number"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">
          添加商品
        </button>
      </div>

      <ul>
        {products.map((p) => (
          <li key={p.id} className="flex justify-between border-b py-2">
            <span>{p.name} - ￥{p.price}</span>
            <button
              onClick={() => handleDelete(p.id)}
              className="text-red-500"
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
