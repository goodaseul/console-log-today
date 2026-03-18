export type CreateDiaryRequest = {
  userId: string;
  diaryDate: string;
  content: string;
};
export type UpdateDiaryRequest = {
  userId: string;
  diaryDate: string;
  content: string;
};

export type GetDiariesByMonthRequest = {
  userId: string;
  yearMonth: string;
};
export type GetDiaryByDateRequest = {
  userId: string;
  diaryDate: string;
};

export type DeleteDiaryRequest = {
  userId: string;
  diaryDate: string;
};

export type Diary = {
  id: string;
  userId: string;
  diaryDate: string;
  content: string;
  created_at: string;
  updated_at: string;
  //   is_locked: boolean;
};
