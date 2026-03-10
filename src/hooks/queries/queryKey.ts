export const queryKeys = {
  diary: {
    all: ["diary"],
    lists: () => [...queryKeys.diary.all, "list"] as const,
    detail: (date: string) => [...queryKeys.diary.all, date] as const,
  },
};
