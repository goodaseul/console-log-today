import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useThemeStore } from "@/stores/theme.store";
import { useEffect, useState } from "react";
import { useAuthInit } from "@/hooks/useAuthInit";

export default function Layout() {
  const { initSessionUser } = useAuthInit();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const init = async () => {
      await initSessionUser();
      setIsAuthReady(true);
    };
    init();
  }, [initSessionUser]);
  if (!isAuthReady) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
