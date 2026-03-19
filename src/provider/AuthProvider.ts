//앱 전체 로그인 상태 관리 담당

import { initSessionUser, syncUser } from "@/api/auth.service";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect, useState } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 초기 로그인 상태 복구
    initSessionUser().then(() => setIsReady(true));

    // 로그인/로그아웃 감지
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          syncUser(session.user.id);
        } else {
          useAuthStore.getState().setUser(null);
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!isReady) return null;

  return children;
}
