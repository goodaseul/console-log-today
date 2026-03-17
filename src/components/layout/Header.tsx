import { Link } from "react-router-dom";
import Button from "../Button";
import { signOut } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";
import { useThemeStore } from "@/stores/theme.store";
import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";

export default function Header() {
  const { user, clearUser } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const handleLogout = async () => {
    await signOut();
    clearUser();
    queryClient.clear();
    toast.success("로그아웃 됐습니다.");
  };
  return (
    <header className="flex items-center justify-between p-5">
      <h1>
        <Link to="/" className="flex items-center">
          console.log(today)
        </Link>
      </h1>
      <div className="flex items-center gap-2">
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
    </header>
  );
}
