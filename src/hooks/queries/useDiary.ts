import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { getDiaryByDate } from "@/api/diary.api";
import type { GetDiaryByDateRequest } from "@/api/types/diary";

export const useDiaryByDate = ({
  userId,
  diary_date,
}: GetDiaryByDateRequest) => {
  return useQuery({
    queryKey: queryKeys.diary.detail(userId, diary_date),
    queryFn: () =>
      getDiaryByDate({
        userId,
        diary_date,
      }),
    enabled: !!userId && !!diary_date,
  });
};
