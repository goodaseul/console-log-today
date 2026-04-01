import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { getDiaryByDate } from "@/api/diary.api";
import { useAuthStore } from "@/stores/auth.store";

export const useDiary = ({ diary_date }: { diary_date: string }) => {
  const userId = useAuthStore((state) => state.user?.id);
  return useQuery({
    queryKey: queryKeys.diary.detail(userId, diary_date),
    queryFn: () => getDiaryByDate({ diary_date }),
    enabled: !!userId && !!diary_date,
  });
};
