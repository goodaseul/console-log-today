import { getDiaryByDate } from "./../../api/diary.api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";

export const useDiaryByDate = (date: string) => {
  return useQuery({
    queryKey: queryKeys.diary.diaryByDate(date),
    queryFn: () => getDiaryByDate(date),
  });
};
