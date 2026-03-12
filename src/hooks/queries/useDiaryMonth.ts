import { useQuery } from "@tanstack/react-query";
import { getDiariesByMonth } from "@/api/diary.api";
import { queryKeys } from "./queryKey";
import { useAuthStore } from "@/stores/auth.store";

export const useDiaryByMonth = (yearMonth: string) => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: queryKeys.diary.month(user?.id, yearMonth),
    queryFn: () => getDiariesByMonth(yearMonth),
    enabled: !!user,
  });
};
