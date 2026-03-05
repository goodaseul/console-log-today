import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { signOut } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const [dark, setDark] = useState(true);
  const handleLogout = async () => {
    await signOut();
    clearUser();
  };
  return (
    <header className="flex items-center justify-between p-5">
      <h1>
        <Link to="/" className="flex items-center">
          console.log(today)
        </Link>
      </h1>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setDark((prev) => !prev)}
          variant="light"
          className="shadow-2xl"
        >
          {dark ? "☀️" : "🌙"}
        </Button>
        {!user ? (
          <Link to={"/login"}>🔒</Link>
        ) : (
          <div className="flex items-center">
            <img src="" alt="" />
            <p>{user.name}</p>
            <Button className="ml-2" variant="light" onClick={handleLogout}>
              🔓
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
