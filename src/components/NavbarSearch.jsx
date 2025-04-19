import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buildQueryString } from "../utils/QueryBuilder";

export default function NavBarSearch() {
    const [searchParams] = useSearchParams(); // 用于从 URL 读取参数
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // ✅ 初始化时根据 URL 参数恢复输入框内容
    useEffect(() => {
        const initialSearch = searchParams.get("description_like") || "";
        setSearchTerm(initialSearch);
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();

        const query = buildQueryString({
            description_like: searchTerm.trim(),
            sort: 'price_desc',
            page: 1,
            limit: 10,
        });

        navigate(`/product-list?${query}`);
    };

    return (
        <div className="sticky top-0 bg-white z-40">
            <nav className="flex justify-center items-center py-4">
                <div className="flex items-center space-x-8 w-4/5">
                    {/* Logo */}
                    <div className="w-1/5 flex justify-center">
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className="h-12 cursor-pointer"
                            onClick={() => { navigate('/'); }}
                        />
                    </div>

                    {/* 搜索框 */}
                    <form
                        onSubmit={handleSearch}
                        className="w-3/5 flex justify-center border rounded-lg overflow-hidden"
                    >
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="搜索商品..."
                            className="w-full px-4 py-2 outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-yellow-500 text-white px-4 py-1 hover:bg-yellow-600"
                        >
                            搜索
                        </button>
                    </form>
                </div>
            </nav>
        </div>
    );
}
