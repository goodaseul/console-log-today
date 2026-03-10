import { supabase } from "@/lib/supabase";
import type { CreateDiaryRequest } from "./types/diary";

const TABLE = "diaries";

export const createDiary = async ({
  userId,
  content,
  diaryDate,
}: CreateDiaryRequest) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      userId,
      content,
      diaryDate,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const getDiaryByDate = async (date: string) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("content")
    .eq("diaryDate", date)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const deleteDiary = async (id: string) => {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
};
