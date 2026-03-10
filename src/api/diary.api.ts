import { supabase } from "@/lib/supabase";
import type { CreateDiaryRequest, UpdateDiaryRequest } from "./types/diary";

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

export const getDiariesByMonth = async (yearMonth: string) => {
  const start = `${yearMonth}-01`;
  const end = `${yearMonth}-31`;

  const { data, error } = await supabase
    .from("diaries")
    .select("*")
    .gte("diaryDate", start)
    .lte("diaryDate", end);

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

export const deleteDiary = async (date: string) => {
  const { error } = await supabase.from(TABLE).delete().eq("diaryDate", date);
  if (error) throw error;
};

export const updateDiary = async ({
  userId,
  diaryDate,
  content,
}: UpdateDiaryRequest) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ content })
    .eq("userId", userId)
    .eq("diaryDate", diaryDate)
    .select()
    .single();

  if (error) throw error;

  return data;
};
