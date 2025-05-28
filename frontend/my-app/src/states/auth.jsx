import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null, or { username, role }

  const login = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setUser({ username, role: "admin" });
      return { success: true, role: "admin" };
    } else if (username === "user" && password === "user123") {
      setUser({ username, role: "user" });
      return { success: true, role: "user" };
    }
    return { success: false };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};