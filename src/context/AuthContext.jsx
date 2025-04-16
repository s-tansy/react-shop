import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

   //顺序《1》
  const [user, setUser] = useState(null);

  //顺序《3》
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async (username, password) => {
    const res = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`);
    const data = await res.json();
    console.log('Login response:', data); // Debugging line
    if (data.length > 0) {
      setUser(data[0]);
      localStorage.setItem("user", JSON.stringify(data[0]));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  //顺序《2》
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
