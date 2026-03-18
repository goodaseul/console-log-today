import { supabase } from "@/lib/supabase";
import type {
  CreateDiaryRequest,
  DeleteDiaryRequest,
  Diary,
  GetDiariesByMonthRequest,
  GetDiaryByDateRequest,
  UpdateDiaryRequest,
} from "./types/diary";

const TABLE = "diaries";

export const createDiary = async (
  payload: CreateDiaryRequest,
): Promise<Diary> => {
  const { data, error } = await supabase
    .from(TABLE)
    .upsert(payload, {
      onConflict: "userId,diaryDate",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};
export const getDiariesByMonth = async (
  payload: GetDiariesByMonthRequest,
): Promise<Diary[]> => {
  const { userId, yearMonth } = payload;

  const [year, month] = yearMonth.split("-").map(Number);
  const lastDay = new Date(year, month, 0).getDate();

  const start = `${yearMonth}-01`;
  const end = `${yearMonth}-${lastDay}`;

  const { data, error } = await supabase
    .from("diaries")
    .select("*")
    .eq("userId", userId)
    .gte("diaryDate", start)
    .lte("diaryDate", end);

  if (error) throw error;

  return data;
};
export const getDiaryByDate = async (
  payload: GetDiaryByDateRequest,
): Promise<{
  content: string;
} | null> => {
  const { userId, diaryDate } = payload;
  const { data, error } = await supabase
    .from(TABLE)
    .select("content")
    .eq("userId", userId)
    .eq("diaryDate", diaryDate)
    .maybeSingle();

  if (error) throw error;
  return data;
};
export const getDiaryCount = async (userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from(TABLE)
    .select("*", { count: "exact", head: true })
    .eq("userId", userId);

  if (error) throw error;
  return count ?? 0;
};
export const deleteDiary = async (payload: DeleteDiaryRequest) => {
  const { userId, diaryDate } = payload;
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("userId", userId)
    .eq("diaryDate", diaryDate);
  if (error) throw error;
};
export const updateDiary = async (
  payload: UpdateDiaryRequest,
): Promise<Diary> => {
  const { content, userId, diaryDate } = payload;
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
