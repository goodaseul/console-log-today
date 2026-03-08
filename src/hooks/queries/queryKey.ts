export const queryKeys = {
  diary: {
    all: ["diary"],
    diaryByDate: (date: string) => [...queryKeys.diary.all, date],
  },
};
