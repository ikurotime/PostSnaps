import ContextProvider from "../components/ContextProvider.tsx";
import Footer from "../components/Footer.tsx";
import Navbar from "./Navbar.tsx";
import SignUpComponent from "./SignUpComponent.tsx";

type Props = {};

export default function SignupLayout({}: Props) {
  return (
    <ContextProvider>
      <div class="relative">
        <Navbar />
        <SignUpComponent />
        <Footer />
      </div>
    </ContextProvider>
  );
}
