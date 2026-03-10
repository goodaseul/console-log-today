export type CreateDiaryRequest = {
  userId: string | undefined;
  content: string;
  diaryDate: string;
};

export type UpdateDiaryRequest = CreateDiaryRequest;
