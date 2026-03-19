export type CreateDiaryRequest = {
  diary_date: string;
  content: string;
};
export type UpdateDiaryRequest = {
  diary_date: string;
  content: string;
};
export type Diary = {
  id: string;

  diary_date: string;
  content: string;
  created_at: string;
  updated_at: string;
  //   is_locked: boolean;
};
