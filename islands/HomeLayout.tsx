import { User } from "supabase";
import ContextProvider from "../components/ContextProvider.tsx";
import Footer from "../components/Footer.tsx";
import HomeContent from "../components/HomeContent.tsx";
import Toast from "../components/Toast.tsx";

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
      <div class="relative flex flex-col min-h-screen p-4 mx-auto max-w-screen-md">
        <div class="flex w-full min-h-full m-auto flex-col justify-center py-14">
          <Toast />
          <HomeContent user={user} liked_post={liked_post} />
        </div>
      </div>
      <Footer />
    </ContextProvider>
  );
};

export default HomeLayout;
