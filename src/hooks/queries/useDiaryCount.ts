import { getDiaryCount } from "@/api/diary.api";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";

export const useDiaryCount = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["diary-count", user?.id],
    queryFn: () => getDiaryCount(user!.id),
  });
};
