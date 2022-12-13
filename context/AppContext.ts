import { defaultContent } from "./../utils.ts";
import { createContext } from "preact";
export const initialState = {
  user: null,
  isToastShown: false,
  tweetContent: defaultContent,
  tweetLoading: true,
  selectedStyle: "style-1",
  isLogo: true,
  padding: 5,
  isOpaque: false,
  captureElement: { current: null },
  dispatch: (action: any) => {},
};
type InitialStateType = typeof initialState;
export const AppContext = createContext<InitialStateType>(initialState);
export const AppReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "SET_TOAST": {
      return {
        ...state,
        isToastShown: action.payload,
      };
    }
    case "SET_STYLE": {
      return {
        ...state,
        selectedStyle: action.payload,
      };
    }
    case "SET_LOGO": {
      return {
        ...state,
        isLogo: action.payload,
      };
    }

    case "SET_TWEET_CONTENT": {
      return {
        ...state,
        tweetContent: action.payload,
      };
    }
    case "SET_SELECTED_STYLE": {
      return {
        ...state,
        selectedStyle: action.payload,
      };
    }
    case "SET_PADDING": {
      return {
        ...state,
        padding: action.payload,
      };
    }
    case "SET_OPAQUE": {
      return {
        ...state,
        isOpaque: action.payload,
      };
    }
    case "SET_CAPTURE_ELEMENT": {
      return {
        ...state,
        captureElement: action.payload,
      };
    }
    case "SET_TWEET_LOADING": {
      return {
        ...state,
        tweetLoading: action.payload,
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
