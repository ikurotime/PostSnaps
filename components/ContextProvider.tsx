import { ComponentChild } from "preact";
import { useContext, useReducer } from "preact/hooks";
import { AppContext, AppReducer, initialState } from "../context/AppContext.ts";

export default function ContextProvider(
  { children }: { children: ComponentChild },
) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppContext);
}
