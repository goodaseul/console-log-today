import { deleteDiary } from "@/api/diary.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import type { DeleteDiaryRequest } from "@/api/types/diary";

export const useDeleteDiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, diaryDate }: DeleteDiaryRequest) =>
      deleteDiary({ userId, diaryDate }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.diary.all,
      });
    },
  });
};
