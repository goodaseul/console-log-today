import { supabase } from "@/lib/supabase";
import type {
  CreateDiaryRequest,
  Diary,
  UpdateDiaryRequest,
} from "./types/diary";

const TABLE = "diaries";

export const createDiary = async (
  payload: CreateDiaryRequest,
): Promise<Diary> => {
  const { data, error } = await supabase
    .from(TABLE)
    .upsert(
      {
        diary_date: payload.diary_date,
        content: payload.content,
      },
      {
        onConflict: "user_id,diary_date",
      },
    )
    .select()
    .single();

  if (error) throw error;
  return data;
};
export const getDiariesByMonth = async ({
  yearMonth,
}: {
  yearMonth: string;
}): Promise<Diary[]> => {
  const [year, month] = yearMonth.split("-").map(Number);
  const lastDay = new Date(year, month, 0).getDate();

  const start = `${yearMonth}-01`;
  const end = `${yearMonth}-${lastDay}`;

  const { data, error } = await supabase
    .from("diaries")
    .select("*")
    .gte("diary_date", start)
    .lte("diary_date", end);

  if (error) throw error;

  return data;
};
export const getDiaryByDate = async ({
  diary_date,
}: {
  diary_date: string;
}): Promise<{
  content: string;
} | null> => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("content")
    .eq("diary_date", diary_date)
    .maybeSingle();

  if (error) throw error;
  return data;
};
export const getDiaryCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from(TABLE)
    .select("*", { count: "exact", head: true });

  if (error) throw error;
  return count ?? 0;
};
export const deleteDiary = async ({ diary_date }: { diary_date: string }) => {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("diary_date", diary_date);
  if (error) throw error;
};
export const updateDiary = async (
  payload: UpdateDiaryRequest,
): Promise<Diary> => {
  const { content, diary_date } = payload;
  const { data, error } = await supabase
    .from(TABLE)
    .update({ content })
    .eq("diary_date", diary_date)
    .select()
    .single();

  if (error) throw error;

  return data;
};
