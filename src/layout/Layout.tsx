import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import { Footer } from "react-day-picker";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
