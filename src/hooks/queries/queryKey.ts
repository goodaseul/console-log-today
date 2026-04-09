export const queryKeys = {
  diary: {
    all: ["diary"],
    lists: () => [...queryKeys.diary.all, "list"] as const,
    detail: (userId: string | undefined, date: string) =>
      [...queryKeys.diary.all, "detail", userId, date] as const,
    allDate: (userId: string | undefined, keyword: string) =>
      [...queryKeys.diary.all, "allDate", userId, keyword] as const,
    count: (userId: string | undefined) =>
      [...queryKeys.diary.all, "count", userId] as const,
  },
};
