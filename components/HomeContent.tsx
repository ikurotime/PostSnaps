import { User } from "supabase";
import BottomBar from "../islands/BottomBar.tsx";
import Navbar from "../islands/Navbar.tsx";
import TweetContainer from "../islands/TweetContainer.tsx";

export default function HomeContent({ user }: { user: User }) {
  return (
    <>
      <Navbar user={user} />
      <TweetContainer />
      <BottomBar />
    </>
  );
}
