import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth.store";

export const useAuthInit = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const syncUser = async (userId: string) => {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, nickname, avatar_url")
      .eq("id", userId)
      .single();

    if (error || !profile) {
      clearUser();
      return false;
    }

    setUser({
      id: profile.id,
      nickname: profile.nickname,
      avatar_url: profile.avatar_url,
    });

    return true;
  };

  const initSessionUser = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      clearUser();
      return;
    }
    return await syncUser(data.session?.user.id);
  };

  return { syncUser, initSessionUser };
};
