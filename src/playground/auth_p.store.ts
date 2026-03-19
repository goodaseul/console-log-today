// "한 번 받아온 데이터를 계속 쓰기 위한 캐시"
// 그냥 넣고 꺼내는 통이라고 생각하자 !
// 여러 컴퍼넌트에서 쓰이는지 ? store : state
// 1. 이거 어디서 데이터를 가져오는지? => service
// 2. 이건 상태를 저장하는지? => store
// 3. 이건 화면에서 쓰나? => 컴포넌트

import { create } from "zustand";

type User = {
  id: string;
  avatar_url: string;
  nickname: string;
} | null;

type AuthState = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
