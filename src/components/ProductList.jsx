import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("加载商品失败", err));
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
