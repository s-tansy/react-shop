import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBarSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/product-list?search=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm(""); // 可选：搜索后清空
        }
    };

    return (
        <div className="sticky top-0 bg-white z-40">
            <nav className="flex justify-center items-center py-4">
                <div className="flex items-center space-x-8 w-4/5">
                    {/* Logo */}
                    <div className="w-1/5 flex justify-center">
                        <img src="/images/logo.png" alt="Logo" className="h-12 cursor-pointer"  onClick={() => {navigate('/');}} />
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
