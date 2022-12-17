import Toast from "../components/Toast.tsx";
import { User } from "supabase";
import ContextProvider from "../components/ContextProvider.tsx";
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

const HomeLayout = (
  { user, liked_post }: { user: User; liked_post: boolean },
) => {
  return (
    <ContextProvider>
      <div class="min-h-screen p-4 mx-auto max-w-screen-md h-full">
        <div class="w-full min-h-screen m-auto flex flex-col justify-center py-14">
          <Toast text="Copied to clipboard" />
          <HomeContent user={user} liked_post={liked_post} />
        </div>
      </div>
    </ContextProvider>
  );
};

export default HomeLayout;
