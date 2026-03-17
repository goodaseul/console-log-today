import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useTheme } from "@/utils/theme";

export default function Layout() {
  useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
