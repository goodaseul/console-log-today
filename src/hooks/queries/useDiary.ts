import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { getDiaryByDate } from "@/api/diary.api";
import type { GetDiaryByDateRequest } from "@/api/types/diary";

export const useDiaryByDate = ({
  userId,
  diaryDate,
}: GetDiaryByDateRequest) => {
  return useQuery({
    queryKey: queryKeys.diary.detail(userId, diaryDate),
    queryFn: () =>
      getDiaryByDate({
        userId,
        diaryDate,
      }),
    enabled: !!userId && !!diaryDate,
  });
};
