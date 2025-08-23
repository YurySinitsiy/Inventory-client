import { createContext, useState } from "react";

export const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
});

export const ThemeProviderWrapper = ({ children }) => {
  // Читаем сразу из localStorage, чтобы state сразу был правильный
  const getInitialTheme = () => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") return true;
      return false;
    } catch {
      return false;
    }
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  const toggleTheme = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      try {
        localStorage.setItem("theme", newMode ? "dark" : "light");
      } catch {}
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};