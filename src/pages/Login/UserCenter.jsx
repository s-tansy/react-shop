import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserCenter() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <>
      <div className="max-w-4xl mx-auto mt-5  flex">
        <div className="">
          <img src="images/logo.png" alt="网站Logo" className="h-24 cursor-pointer" onClick={() => { navigate('/'); }} />
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">用户中心</h2>
        <p>用户名：{user.username}</p>
        <p>角色：{user.role}</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        >
          退出登录
        </button>
      </div>
    </>
  );
}
