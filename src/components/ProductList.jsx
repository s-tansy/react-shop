import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProductQuery, buildQueryString } from "../utils/QueryBuilder";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const { description_like,productCategory, sort, page, limit } = useProductQuery();

    useEffect(() => {
        const query = {
            _page: page,
            _limit: limit,
        };

        if (description_like) query.description_like = description_like;
        if (productCategory) query.productCategory = productCategory;
        if (sort === 'price_asc') {
            query._sort = 'price';
            query._order = 'asc';
        } else if (sort === 'price_desc') {
            query._sort = 'price';
            query._order = 'desc';
        }

        const queryString = buildQueryString(query);
        fetch("http://localhost:3001/products?"+queryString)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(err => console.error("加载商品失败", err));
       
    }, [description_like,productCategory, sort, page, limit]);



    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
