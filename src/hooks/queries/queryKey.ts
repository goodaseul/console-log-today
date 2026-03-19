export const queryKeys = {
  diary: {
    all: ["diary"],
    lists: () => [...queryKeys.diary.all, "list"] as const,
    detail: (userId: string | undefined, date: string) =>
      [...queryKeys.diary.all, "detail", userId, date] as const,
    month: (userId: string | undefined, yearMonth: string) =>
      [...queryKeys.diary.all, "month", userId, yearMonth] as const,
    count: (userId: string | undefined) =>
      [...queryKeys.diary.all, "count", userId] as const,
  },
};
