import { createContext, useContext, useEffect, useState } from "react";
import { setToken } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ LOAD USER FROM LOCALSTORAGE ON REFRESH
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);
  const isAuthenticated = !!user;
  const login = (data) => {
  setToken(data.token);
  setUser(data.user);

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
};
const logout = () => {
  setToken(null);
  setUser(null);

  localStorage.clear();
};
  // const login = (data) => {
  //   setToken(data.token);
  //   setUser(data.user);

  //   // ✅ SAVE TO LOCALSTORAGE
  //   localStorage.setItem("token", data.token);
  //   localStorage.setItem("user", JSON.stringify(data.user));
  // };

  // const logout = () => {
  //   setToken(null);
  //   setUser(null);

  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  // };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
