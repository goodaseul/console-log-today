import { getDiaryCount } from "@/api/diary.api";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";

export const useDiaryCount = () => {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: queryKeys.diary.count(userId),
    queryFn: () => getDiaryCount(userId!),
    enabled: !!userId,
  });
};
