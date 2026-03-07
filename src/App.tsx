import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import { Toaster } from "sonner";
import Mypage from "./pages/Mypage";

export function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/mypage" element={<Mypage />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-center" />
    </>
  );
}
