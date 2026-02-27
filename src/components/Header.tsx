import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [dark, setDark] = useState(true);
  return (
    <header className="flex items-center justify-between p-5">
      <h1>
        <Link to="/" className="flex items-center">
          console.log(today)
        </Link>
      </h1>
      <div className="flex items-center gap-2">
        <p onClick={() => setDark((prev) => !prev)}>
          {dark ? "밝게" : "어둡게"}
        </p>
        <Link to={"/login"}>로그인</Link>
      </div>
    </header>
  );
}
