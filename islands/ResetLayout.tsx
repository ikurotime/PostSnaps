import ContextProvider from "../components/ContextProvider.tsx";
import Footer from "../components/Footer.tsx";
import Navbar from "./Navbar.tsx";
import ResetComponent from "./ResetComponent.tsx";

type Props = {};

export default function ResetLayout({}: Props) {
  return (
    <ContextProvider>
      <div class="relative">
        <Navbar />
        <div class="min-h-[80vh]">
          <div className="h-full max-w-screen-md mx-auto flex">
            <div className="m-auto h-full flex">
              <ResetComponent />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ContextProvider>
  );
}
