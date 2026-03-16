import Button from "@/components/Button";
import { useDiaryCount } from "@/hooks/queries";
import { useAuthStore } from "@/stores/auth.store";
import type { MypageMode } from "@/types/diaryType";
import { useState } from "react";

export default function Mypage() {
  const user = useAuthStore((state) => state.user);
  const { data: diaryCount } = useDiaryCount();

  const [mode, setMode] = useState<MypageMode>("view");

  const today = new Date().toISOString().split("T")[0];
  const hours = new Date().getHours();
  const modifyMypage = () => {
    setMode("edit");
  };
  const greetHours =
    hours > 12 ? "오후" : hours > 18 ? "저녁" : hours > 21 ? "밤" : "아침";

  const isView = mode === "view";
  const buttonStatus = isView ? (
    <>
      <Button variant="light" onClick={modifyMypage}>
        수정하기
      </Button>
      <Button onClick={() => console.log("탈퇴할래영")}>탈퇴하기</Button>
    </>
  ) : (
    <>
      <Button variant="light" onClick={() => console.log("적용하기")}>
        적용하기
      </Button>
      <Button onClick={() => console.log("취소하기")}>취소하기</Button>
    </>
  );

  return (
    <section className="p-5">
      <div>
        <div className="bg-white/10 shadow-2xl p-5 text-gray-200 rounded-xs">
          <h2 className="text-lg font-medium">좋은 {greetHours} 입니다!</h2>
          <h3 className="text-md font-medium">
            {user?.nickname}님의 마이페이지입니다.
          </h3>
          <p className="mt-5">
            <span className="mx-1 rounded bg-red-100 px-2 py-0.5 font-semibold text-red-700">
              {today}
            </span>
            까지 작성하신 게시물은 총
            <span className="mx-1 rounded bg-yellow-100 px-2 py-0.5 font-semibold text-yellow-700">
              {diaryCount ?? 0}개
            </span>
            입니다.
          </p>
        </div>
        <div className="mt-5 flex gap-2 justify-end">{buttonStatus}</div>
        <div className="mt-5 rounded-xl border-white flex items-center gap-5">
          <img
            src={
              user?.avatar_url ??
              `https://ui-avatars.com/api/?name=${user?.nickname}`
            }
            className="w-20 h-20 rounded-full"
            alt={`${user?.nickname} 프로필 사진`}
          />
          <h3 className="text-2xl">{user?.nickname}님</h3>
        </div>
      </div>
    </section>
  );
}
