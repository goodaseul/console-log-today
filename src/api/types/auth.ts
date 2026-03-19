// update 는 부분 업데이트로 => 하나만 바꿀 수 있으니 불필요한 값은 안 보내도 됨
export type UpdateProfileRequest = {
  id: string;
  nickname?: string;
  avatar_url?: string | null;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type updateAvatarUrlRequest = {
  file: File;
  userId: string;
};
