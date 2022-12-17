import { ComponentChild } from "preact";
import { useContext, useEffect, useReducer } from "preact/hooks";
import { AppContext, AppReducer, initialState } from "../context/AppContext.ts";
import { supabase } from "../publicSupabase.ts";

export default function ContextProvider(
  { children }: { children: ComponentChild },
) {
  /*  const getUserData = (token: string) => {
    supabase.auth.getUser(token).then(({ data, error }) => {
      if (error) {
        console.log(error);
      }
      if (data) {
        dispatch({ type: "SET_USER", payload: data.user });
      }
    });
  }; */
  const [state, dispatch] = useReducer(AppReducer, initialState);
  useEffect(() => {
    //get access token from hash and set a cookie with it, with the maxage of the token
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substr(1));
    const access_token = params.get("access_token");
    const expires_in = params.get("expires_in");
    window.location.hash = "";
    if (access_token) {
      document.cookie =
        `ps.supabase.auth.token=${access_token}; max-age=${expires_in}; path=/; httpOnly=true; SameSite=Lax; Secure=true;`;
      window.location.href = "/";
      /*  getUserData(access_token); */
    }
    /*  //if there is a cookie, get the user
    const cookies = document.cookie.split(";");
    const cookie = cookies.find((cookie) =>
      cookie.includes("ps.supabase.auth")
    );
    if (cookie) {
      const token = cookie.split("=")[1];
      getUserData(token);
    } */
    //reload the page to get the cookie
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
