import { useQuery } from "@tanstack/react-query";
import { getDiariesByMonth } from "@/api/diary.api";
import { queryKeys } from "./queryKey";
import type { GetDiariesByMonthRequest } from "@/api/types/diary";

export const useDiaryByMonth = ({
  userId,
  yearMonth,
}: GetDiariesByMonthRequest) => {
  return useQuery({
    queryKey: queryKeys.diary.month(userId, yearMonth),
    queryFn: () => getDiariesByMonth({ userId, yearMonth }),
    enabled: !!userId,
  });
};
