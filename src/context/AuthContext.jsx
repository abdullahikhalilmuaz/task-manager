import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("taskflow_user") || "null"),
  );

  const persist = (data) => {
    localStorage.setItem("taskflow_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    return persist(data);
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return persist(data);
  };

  const updateProfile = async (name, email) => {
    const { data } = await api.put("/auth/profile", { name, email });
    return persist(data);
  };

  const changePassword = async (currentPassword, newPassword) => {
    const { data } = await api.put("/auth/password", {
      currentPassword,
      newPassword,
    });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("taskflow_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
