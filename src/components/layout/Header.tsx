import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import { signOut } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";
import { useThemeStore } from "@/stores/theme.store";
import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";

export default function Header() {
  const { user, clearUser } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    clearUser();
    queryClient.clear();
    navigate("/");
    toast.success("로그아웃 됐습니다.");
  };
  return (
    <header>
      <div className="md:flex items-center justify-between p-5 max-w-5xl mx-auto">
        <h1>
          <Link to="/" className="flex items-center">
            console.log(today)
          </Link>
        </h1>
        <div className="flex items-center mt-5 justify-end md:mt-0 md:justify-baseline gap-2">
          <Button onClick={toggleTheme} variant="light" className="shadow-2xl">
            {theme === "dark" ? "🌙" : "☀️"}
          </Button>
          {!user ? (
            <Link to={"/login"}>🔒</Link>
          ) : (
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-full"
                src={
                  user.avatar_url ??
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nickname)}`
                }
                alt={`프로필 사진`}
              />
              <Link to={"/mypage"} className="ml-2">
                {user.nickname}
              </Link>
              <Button className="ml-2" variant="light" onClick={handleLogout}>
                🔓
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
