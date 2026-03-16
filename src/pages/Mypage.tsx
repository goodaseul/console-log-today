import { updateProfile } from "@/api/auth.api";
import Button from "@/components/Button";
import Info from "@/components/mypage/Info";
import { useDiaryCount } from "@/hooks/queries";
import { useAuthStore } from "@/stores/auth.store";
import type { MypageMode } from "@/types/diaryType";
import { useState } from "react";
import { toast } from "sonner";
import { uploadAvatar } from "@/api/auth.api";

export default function Mypage() {
  const user = useAuthStore((state) => state.user);
  const { data: diaryCount } = useDiaryCount();
  const [mode, setMode] = useState<MypageMode>("view");
  const hours = new Date().getHours();

  const [nickname, setNickname] = useState(user?.nickname ?? "");
  const [avatar, setAvatar] = useState(user?.avatar_url ?? "");
  const [file, setFile] = useState<File | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);

    const preview = URL.createObjectURL(selected);
    setAvatar(preview);
  };

  const startEdit = () => {
    setMode("edit");
  };

  const cancleEdit = () => {
    toast.error("수정이 취소되었습니다.");
    setMode("view");
  };
  const applyEdit = async () => {
    if (!user) return;

    let avatarUrl = avatar;

    if (file) {
      avatarUrl = await uploadAvatar(file, user.id);
    }

    const { success, error } = await updateProfile(
      user.id,
      nickname,
      avatarUrl,
    );

    if (!success) {
      console.log(error);
      return;
    }

    toast.success("수정되었습니다.");
    setMode("view");
  };
  const greetHours =
    hours < 12 ? "아침" : hours < 18 ? "오후" : hours < 21 ? "저녁" : "밤";

  const isView = mode === "view";
  const buttonStatus = isView ? (
    <>
      <Button variant="light" onClick={startEdit}>
        수정하기
      </Button>
      <Button onClick={() => console.log("탈퇴할래영")}>탈퇴하기</Button>
    </>
  ) : (
    <>
      <Button variant="light" onClick={applyEdit}>
        적용하기
      </Button>
      <Button onClick={cancleEdit}>취소하기</Button>
    </>
  );

  return (
    <section className="p-5">
      <div>
        <Info
          greetHours={greetHours}
          diaryCount={diaryCount}
          nickname={user?.nickname ?? ""}
        />
        <div className="mt-5 flex gap-2 justify-end">{buttonStatus}</div>
        <div className="mt-5 rounded-xl border-white flex items-center gap-5">
          {mode === "view" ? (
            <>
              <img
                src={
                  user?.avatar_url ??
                  `https://ui-avatars.com/api/?name=${user?.nickname}`
                }
                className="w-20 h-20 rounded-full"
                alt={`${user?.nickname} 프로필 사진`}
              />

              <h3 className="text-2xl">{user?.nickname}님</h3>
            </>
          ) : (
            <>
              <div className="relative w-20 h-20">
                <img
                  src={avatar ?? `https://ui-avatars.com/api/?name=${nickname}`}
                  className="w-20 h-20 rounded-full object-cover"
                />

                <label className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 rounded cursor-pointer">
                  변경
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임"
                className="border rounded-md px-3 py-1"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
