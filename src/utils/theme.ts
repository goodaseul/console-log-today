import { useThemeStore } from "@/stores/theme.store";
import { useEffect } from "react";

export function useTheme() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  return theme;
}
