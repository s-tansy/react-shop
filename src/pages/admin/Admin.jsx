import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminPage() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return <div className="p-6">管理员内容</div>;
}
