import { supabase } from "@/lib/supabase";

const TABLE = "diaries";

export const createDiary = async (userId: string, content: string) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      userId: userId,
      content,
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
    .eq("diary_date", date)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const deleteDiary = async (id: string) => {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
};
