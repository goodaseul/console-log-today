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

export const updateProfile = async (
  userId: string,
  nickname: string,
  avatar_url: string | null,
) => {
  const { error } = await supabase
    .from("profiles")
    .update({
      nickname,
      avatar_url,
    })
    .eq("id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
};
export const uploadAvatar = async (file: File, userId: string) => {
  const filePath = `${userId}/avatar-${Date.now()}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return data.publicUrl;
};
