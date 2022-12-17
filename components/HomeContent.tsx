import { User } from "supabase";
import BottomBar from "../islands/BottomBar.tsx";
import Navbar from "../islands/Navbar.tsx";
import TweetContainer from "../islands/TweetContainer.tsx";

export default function HomeContent(
  { user, liked_post }: { user: User; liked_post: boolean },
) {
  return (
    <>
      <Navbar user={user} />
      <TweetContainer />
      <BottomBar user={user} liked_post={liked_post} />
    </>
  );
}
