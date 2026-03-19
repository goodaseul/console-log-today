import { useQuery } from "@tanstack/react-query";
import { getDiariesByMonth } from "@/api/diary.api";
import { queryKeys } from "./queryKey";
import { useAuthStore } from "@/stores/auth.store";

export const useDiaryByMonth = ({ yearMonth }: { yearMonth: string }) => {
  const userId = useAuthStore((state) => state.user?.id);
  return useQuery({
    queryKey: queryKeys.diary.month(userId, yearMonth),
    queryFn: () => getDiariesByMonth({ yearMonth }),
    enabled: !!userId && !!yearMonth,
  });
};
