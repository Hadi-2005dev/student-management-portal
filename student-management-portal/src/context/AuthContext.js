import { createContext, useContext, useState } from "react";

//creating the context
const AuthContext = createContext();

//The AuthProvider handles login/logout and wrapping children with it
export function AuthProvider({ children }) {
  
  const [user, setUser] = useState(null);

  // Login
  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      setUser({ username, role: "admin" });
    } else if (username === "user" && password === "user") {
      setUser({ username, role: "user" });
    } else {
      return false;
    }
    return true;
  };

  // Logout 
  const logout = () => {
    //The useState function
    setUser(null);
  };

  return (

    //Wrapping the children with user 
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}                                                                                             

//Used by other page to have user values
export function useAuth() {
  return useContext(AuthContext);
}
