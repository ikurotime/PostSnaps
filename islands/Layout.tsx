import {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "preact/hooks";

import Toast from "../components/Toast.tsx";

import Navbar from "../islands/Navbar.tsx";

import { AppContext, AppReducer, initialState } from "../context/AppContext.ts";

import { AppProps } from "$fresh/server.ts";
import ContextProvider from "../components/ContextProvider.tsx";
import { ComponentChild, ComponentChildren, toChildArray } from "preact";
import Home from "../routes/index.tsx";
import HomeContent from "../components/HomeContent.tsx";

export type UserData = {
  name: string;
  username: string;
  profile_image_url: string;
};
export type TweetData = {
  text: string;
  created_at: string;
  public_metrics: {
    like_count: number;
    retweet_count: number;
    reply_count: number;
    quote_count: number;
  };
};
export type MediaType = {
  media_key: string;
  type: string;
  url: string;
};
type Content = {
  data: TweetData[];
  includes: {
    users: UserData[];
    media: MediaType[];
  };
};

const Layout = () => {
  return (
    <ContextProvider>
      <div class="min-h-screen p-4 mx-auto max-w-screen-md h-full">
        <div class="w-full min-h-screen m-auto flex flex-col justify-center py-14">
          <Toast text="Image copied" />
          <HomeContent />
        </div>
      </div>
    </ContextProvider>
  );
};

export default Layout;
