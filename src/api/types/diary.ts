export type CreateDiaryRequest = {
  userId: string | undefined;
  content: string;
  diaryDate: string;
};

export type Diary = {
  id: string;
  userId: string;
  diaryDate: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_locked: boolean;
  pin_hash: string | null;
};
export type UpdateDiaryRequest = CreateDiaryRequest;
