import Toast from "../components/Toast.tsx";
import { User } from "supabase";
import ContextProvider from "../components/ContextProvider.tsx";
import HomeContent from "../components/HomeContent.tsx";
import Navbar from "./Navbar.tsx";

const ExploreLayout = ({ user }: { user: User }) => {
  return (
    <ContextProvider>
      <div class="min-h-screen p-4 mx-auto max-w-screen-md h-full">
        <div class="w-full min-h-screen m-auto flex flex-col justify-center py-14">
          <Toast text="Copied to clipboard" />
          <Navbar user={user} />
        </div>
      </div>
    </ContextProvider>
  );
};

export default ExploreLayout;
