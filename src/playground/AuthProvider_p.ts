import { useEffect, useState } from "react";
import { initSessionUser, syncUser } from "./auth_p.service";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "./auth_p.store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initSessionUser();
      } catch (error) {
        console.error(error);
      } finally {
        setIsReady(true);
      }
    };
    init();

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
