import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function NavbarCategory() {

    const [categorys, setCategory] = useState([]);
    const visibleCount = 10;
    const visibleItems = categorys.slice(0, visibleCount);
    const hiddenItems = categorys.slice(visibleCount);
    const [activeCategory, setActiveCategory] = useState(null); // 用于存储当前点击的分类 ID

    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/productCategories")
            .then(res => { return res.json(); })
            .then(data => { setCategory(data); })
            .catch(err => console.error("加载商品分类失败", err));
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const currentCategory = queryParams.get("productCategory");
        setActiveCategory(currentCategory);
    }, [location.search]); // 监听路径变化


    return (
        <div className="p-6 space-y-6" style={{ paddingTop: "0px" }}>
            <nav className="flex justify-center items-center text-gray-600 text-l">
                <ul className="flex space-x-6">
                    {visibleItems.map(cat => (
                        <li key={cat.id}
                            className={`hover:text-yellow-600 cursor-pointer transition ${activeCategory === cat.name ? "bg-gray-200" : ""
                                }`}
                        >
                            <Link to={`/product-list?productCategory=${cat.name}`}>
                                {cat.name}
                            </Link>
                        </li>
                    ))}
                    {hiddenItems.length > 0 && (
                        // 如果有隐藏的分类，显示“更多”按钮

                        <div className="relative">
                            <span
                                className="cursor-pointer text-gray-600 hover:text-blue-500"
                                onClick={() => setShowMore(!showMore)}
                            >
                                更多 ▾
                            </span>

                            {showMore && (
                                <div className="absolute top-full mt-1 bg-white border rounded shadow-lg p-2 w-32">
                                    {hiddenItems.map(cat => (
                                        <li key={cat.id}
                                            className={`border-b border-gray-100 py-2 text-center hover:text-yellow-600 cursor-pointer transition ${activeCategory === cat.name ? "bg-gray-200" : ""
                                                }`}
                                        >
                                            <Link to={`/product-list?productCategory=${cat.name}`}>
                                                {cat.name}
                                            </Link>
                                        </li>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </ul>
            </nav>

        </div>
    );
}