import { createDiary } from "@/api/diary.api";
import type { CreateDiaryRequest } from "@/api/types/diary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";

export const useCreateDiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateDiaryRequest) => createDiary(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.diary.all,
      });
    },
  });
};
