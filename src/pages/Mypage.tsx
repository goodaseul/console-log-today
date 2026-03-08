import { useAuthStore } from "@/stores/auth.store";

export default function Mypage() {
  const user = useAuthStore((state) => state.user);
  return (
    <section className="p-5">
      <div>
        <div className="rounded-xl border-white flex items-center gap-5">
          <label htmlFor="">
            <input type="file" hidden />
            <img
              src={
                user?.avatar_url ??
                `https://ui-avatars.com/api/?name=${user?.nickname}`
              }
              className="w-20 h-20 rounded-full"
              alt={`${user?.nickname} 프로필 사진`}
            />
          </label>
          <h3 className="text-2xl">{user?.nickname}님</h3>
        </div>
      </div>
    </section>
  );
}
