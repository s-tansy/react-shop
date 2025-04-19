import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/");
    } else {
      setError("用户名或密码错误");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-5  flex">
        <div className="">
          <img src="images/logo.png" alt="网站Logo" className="h-24 cursor-pointer" onClick={() => {navigate('/');}} />
        </div>

      </div>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h1 className="text-xl font-bold mb-4">登录</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded"
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            autoComplete="current-password"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            登录
          </button>
        </form>
        <p className="text-sm mt-4">
          还没有账号？<Link to="/register" className="text-blue-600">去注册</Link>
        </p>
      </div>
    </>
  );
}
