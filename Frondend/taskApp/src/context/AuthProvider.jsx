import { useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("username")
  );

  // LOGIN
  const login = async (email, password) => {
    const res = await api.post("auth/login/", {
      email,
      password,
    });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    localStorage.setItem("username", res.data.username);

    setUser(res.data.username);
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
