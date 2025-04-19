import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    // 先检查用户名是否存在
    e.preventDefault();
    const resCheck = await fetch(`http://localhost:3001/users?username=${username}`);
    const existing = await resCheck.json();
    if (existing.length > 0) {
      setError("用户名已存在");
      return;
    }

    //根据用户名和密码创建新用户
    const newUser = {
      username,
      password,
      role: "user", // 默认新用户是普通用户
    };

    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (res.ok) {
      // 注册成功后自动登录
      await login(username, password);
      navigate("/");
    } else {
      setError("注册失败，请重试");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-5  flex">
        <div className="">
          <img src="images/logo.png" alt="网站Logo" className="h-24 cursor-pointer" onClick={() => { navigate('/'); }} />
        </div>

      </div>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h1 className="text-xl font-bold mb-4">注册</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
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
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
            注册
          </button>
        </form>
        <p className="text-sm mt-4">
          已有账号？<Link to="/login" className="text-blue-600">去登录</Link>
        </p>
      </div>
    </>

  );
}
