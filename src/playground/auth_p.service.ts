import { supabase } from "@/lib/supabase";
import { useAuthStore } from "./auth_p.store";

const setUser = useAuthStore.getState().setUser;
export const syncUser = async (id: string) => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, nickname, avatar_url")
    .eq("id", id)
    .single();
  if (error || !profile) {
    setUser(null);
    return;
  }
  setUser({
    id: profile.id,
    nickname: profile.nickname,
    avatar_url: profile.avatar_url,
  });

  return true;
};

export const initSessionUser = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (!data.session || error) {
    setUser(null);
    return false;
  }

  return await syncUser(data.session.user.id);
};
