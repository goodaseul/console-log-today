import { deleteDiary } from "@/api/diary.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { useAuthStore } from "@/stores/auth.store";

export const useDeleteDiary = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  return useMutation({
    mutationFn: (diaryDate: string) => deleteDiary(diaryDate),
    onSuccess: (_, diaryDate) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.diary.detail(user?.id, diaryDate),
      });
    },
  });
};
