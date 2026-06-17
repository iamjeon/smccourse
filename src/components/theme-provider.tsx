"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";
const KEY = "ll-theme";

const Ctx = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
} | null>(null);

/** Inline script string — run in <body> before paint to avoid a theme flash. */
export const themeScript = `(function(){try{var t=localStorage.getItem('${KEY}');if(t!=='light'&&t!=='dark'){t='dark';}var d=document.documentElement;d.classList.toggle('dark',t==='dark');d.style.colorScheme=t;}catch(e){}})();`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  // Sync state with whatever the no-flash script already applied.
  useEffect(() => {
    setThemeState(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    const root = document.documentElement;
    root.classList.toggle("dark", t === "dark");
    root.style.colorScheme = t;
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme],
  );

  return (
    <Ctx.Provider value={{ theme, setTheme, toggle }}>{children}</Ctx.Provider>
  );
}

export function useTheme() {
  return (
    useContext(Ctx) ?? {
      theme: "dark" as Theme,
      setTheme: () => {},
      toggle: () => {},
    }
  );
}
