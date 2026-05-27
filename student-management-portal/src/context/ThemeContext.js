import { createContext, useContext, useState } from "react";

//creating the context
const ThemeContext = createContext();

//The ThemeProvider handles changing colors and wrapping children with it

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Children is a special structre : This tells React: "Put the inside components here */}
      {children}
    </ThemeContext.Provider>
  );
}

//Used by other page to have theme value 
export function useTheme() {
  return useContext(ThemeContext);
}
