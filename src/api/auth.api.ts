import { supabase } from "@/lib/supabase";
import type {
  SignInRequest,
  updateAvatarUrlRequest,
  UpdateProfileRequest,
} from "./types/auth";

const PROFILE_TABLE = "profiles";
const AVATAR = "avatars";
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
    const { error: profileError } = await supabase.from(PROFILE_TABLE).insert({
      id: data.user.id,
      nickname,
      //   avatar_url: null,
    });
    if (profileError) {
      return { success: false, error: profileError.message };
    }
  }

  return { success: true, error: null };
};

export const signIn = async (payload: SignInRequest) => {
  return await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const updateProfile = async ({ id, ...rest }: UpdateProfileRequest) => {
  const { error } = await supabase
    .from(PROFILE_TABLE)
    .update({ ...rest })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
};
export const uploadAvatar = async (payload: updateAvatarUrlRequest) => {
  const filePath = `${payload.userId}/avatar-${Date.now()}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, payload.file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from(AVATAR).getPublicUrl(filePath);

  return data.publicUrl;
};
