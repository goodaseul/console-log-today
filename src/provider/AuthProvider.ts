import { useAuthInit } from "@/hooks/useAuthInit";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect, useState } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { syncUser } = useAuthInit();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          syncUser(session.user.id).then(() => setIsReady(true));
        } else {
          useAuthStore.getState().setUser(null);
          setIsReady(true);
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!isReady) return null;

  return children;
}
