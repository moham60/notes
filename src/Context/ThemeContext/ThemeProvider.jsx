import { useEffect, useState } from "react";
import { createContext } from "react";

export const themeContext = createContext();

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState("dark");
    const toggoleTheme = () => {
        if (theme == "dark") {
            setTheme("light");
            localStorage.setItem("theme","light");
        }
        else {
            setTheme("dark");
            localStorage.setItem("theme","dark");
        }
    }
    useEffect(() => {
        const storedTheme = localStorage?.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, [])
    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
         document.documentElement.classList.add(theme)
    },[theme])

    return (
        <themeContext.Provider value={{ theme, toggoleTheme }}>
            {children}
        </themeContext.Provider>
  );
}