import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { getDiaryByDate } from "@/api/diary.api";

export const useDiaryByDate = (date: string) => {
  return useQuery({
    queryKey: queryKeys.diary.detail(date),
    queryFn: () => getDiaryByDate(date),
  });
};
