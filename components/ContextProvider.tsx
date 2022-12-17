import { ComponentChild } from "preact";
import { useContext, useEffect, useReducer } from "preact/hooks";
import { AppContext, AppReducer, initialState } from "../context/AppContext.ts";

export default function ContextProvider(
  { children }: { children: ComponentChild },
) {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substr(1));
    const access_token = params.get("access_token");
    const expires_in = params.get("expires_in");
    window.location.hash = "";
    if (access_token) {
      document.cookie =
        `ps.supabase.auth.token=${access_token}; max-age=${expires_in}; path=/; SameSite=Lax; Secure=true; domain=${window.location.hostname}`;
      window.location.href = "/";
    }
  }, []);
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppContext);
}
