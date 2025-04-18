import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get("productCategory");
    const categoryName = category ? `?productCategory=${category}` : "";

    useEffect(() => {

        fetch("http://localhost:3001/products" + categoryName)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(err => console.error("加载商品失败", err));
    }, [category]);


    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
