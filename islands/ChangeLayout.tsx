import { User } from "supabase";
import ContextProvider from "../components/ContextProvider.tsx";
import Footer from "../components/Footer.tsx";
import ChangeComponent from "./ChangeComponent.tsx";
import Navbar from "./Navbar.tsx";
type Props = {
  user: User;
};

export default function ChangeLayout({ user }: Props) {
  return (
    <ContextProvider>
      <div class="relative">
        <Navbar user={user} />
        <div class="min-h-[80vh]">
          <div className="h-full max-w-screen-md mx-auto flex">
            <div className="m-auto h-full flex">
              <ChangeComponent user={user} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ContextProvider>
  );
}
