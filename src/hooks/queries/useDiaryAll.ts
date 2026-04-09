import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { useAuthStore } from "@/stores/auth.store";
import { getDiariesAll } from "@/api/diary.api";

export const useDiaryAll = (keyword: string) => {
  const userId = useAuthStore((state) => state.user?.id);
  return useQuery({
    queryKey: queryKeys.diary.allDate(userId, keyword),
    queryFn: () => getDiariesAll(keyword),
    enabled: !!userId && !!keyword,
  });
};
