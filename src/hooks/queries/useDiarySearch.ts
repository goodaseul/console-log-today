import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { getDiarySearch } from "@/api/diary.api";
import { useAuthStore } from "@/stores/auth.store";

export const useDiarySearch = (keyword: string) => {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: queryKeys.diary.search(userId, keyword),
    queryFn: () => getDiarySearch(keyword),
    enabled: !!userId && !!keyword,
  });
};
