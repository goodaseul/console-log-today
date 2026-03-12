import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { getDiaryByDate } from "@/api/diary.api";
import { useAuthStore } from "@/stores/auth.store";

export const useDiaryByDate = (diaryDate: string) => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: queryKeys.diary.detail(user?.id, diaryDate),
    queryFn: () => getDiaryByDate(diaryDate),
    enabled: !!user,
  });
};
