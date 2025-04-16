import { useNavigate } from "react-router-dom";

export default function UserCenter() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">欢迎来到用户中心</h1>
      <p className="mb-4">这是您登录后才能访问的页面。</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        退出登录
      </button>
    </div>
  );
}
