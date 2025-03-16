// themeManager.tsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { setTheme } from "@/app/global";

export type Theme = "light" | "dark" | "system";

export const useTheme = () => {
  const theme = useSelector((state: RootState) => state.global.theme);
  const dispatch = useDispatch();

  const updateTheme = (newTheme: Theme) => {
    localStorage.setItem("vite-ui-theme", newTheme);
    dispatch(setTheme(newTheme));
  };

  return { theme, setTheme: updateTheme };
};

export const ThemeEffect = () => {
  const theme = useSelector((state: RootState) => state.global.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return null;
};
