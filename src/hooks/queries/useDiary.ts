import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { getDiaryByDate } from "@/api/diary.api";

export const useDiaryByDate = (diaryDate: string) => {
  return useQuery({
    queryKey: queryKeys.diary.detail(diaryDate),
    queryFn: () => getDiaryByDate(diaryDate),
  });
};
