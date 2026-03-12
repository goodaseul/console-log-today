import { deleteDiary } from "@/api/diary.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";

export const useDeleteDiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (diaryDate: string) => deleteDiary(diaryDate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.diary.all,
      });
    },
  });
};
