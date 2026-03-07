import { supabase } from "@/lib/supabase";

export const signUp = async (
  email: string,
  password: string,
  nickname: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    return { success: false, error: error.message };
  }
  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      nickname,
      avatar_url: null,
    });
    if (profileError) {
      return { success: false, error: profileError.message };
    }
  }

  return { success: true, error: null };
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};
