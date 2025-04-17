import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function NavbarCategory({ visible }) {

    const [categorys, setCategory] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/productCategories")
            .then(res => { return res.json(); })
            .then(data => { setCategory(data); })
            .catch(err => console.error("加载商品分类失败", err));
    }, []);

    if (!visible) return null;
    return (
        <div className="p-6 space-y-6" style={{ paddingTop: "0px" }}>
            <nav className="flex gap-4">
                <ul className="flex space-x-6">
                    {categorys.map(cat => (
                        <li key={cat.id}>
                            <Link to={`/product-list?category=${cat.name}`}
                                className="hover:bg-blue-100 hover:text-black-700 cursor-pointer transition" >
                                {cat.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}