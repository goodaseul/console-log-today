import { deleteDiary } from "@/api/diary.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";

export const useDeleteDiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { diary_date: string }) => deleteDiary(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.diary.all,
      });
    },
  });
};
