import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import type { UpdateDiaryRequest } from "@/api/types/diary";
import { updateDiary } from "@/api/diary.api";

export const useUpdateDiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: UpdateDiaryRequest) => updateDiary(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.diary.all,
      });
    },
  });
};
