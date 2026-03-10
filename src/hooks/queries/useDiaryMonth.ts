import { useQuery } from "@tanstack/react-query";
import { getDiariesByMonth } from "@/api/diary.api";
import { queryKeys } from "./queryKey";

export const useDiaryByMonth = (yearMonth: string) => {
  return useQuery({
    queryKey: queryKeys.diary.month(yearMonth),
    queryFn: () => getDiariesByMonth(yearMonth),
  });
};
