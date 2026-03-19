// 비즈니스 로직

import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth.store";

// 로그인 후 / 초기화 시 공통 사용
const setUser = useAuthStore.getState().setUser;

export const syncUser = async (id: string) => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, nickname, avatar_url")
    .eq("id", id)
    .maybeSingle();

  if (!profile || error) {
    setUser(null);
    return false;
  }

  setUser({
    id: profile.id,
    nickname: profile.nickname,
    avatar_url: profile.avatar_url,
  });

  return true;
};

//앱 시작 시
export const initSessionUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data) {
    setUser(null);
    return false;
  }

  return await syncUser(data.session?.user.id ?? "");
};
