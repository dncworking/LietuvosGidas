import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );
  // Pasiimame rolę tiesiai iš localStorage, kad persikrovus puslapiui ji nedingtų
  const [userRole, setUserRole] = useState(
    localStorage.getItem("role") || "user",
  );

  // Atnaujiname funkciją, kad priimtų rolę iš LoginForm
  const loginStateUpdate = (role) => {
    setIsAuthenticated(true);
    setUserRole(role || "user");
    localStorage.setItem("role", role || "user");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, loginStateUpdate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
