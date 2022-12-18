import ContextProvider from "../components/ContextProvider.tsx";
import Footer from "../components/Footer.tsx";
import LoginComponent from "./LoginComponent.tsx";
import Navbar from "./Navbar.tsx";

type Props = {};

export default function LoginLayout({}: Props) {
  return (
    <ContextProvider>
      <div class="relative">
        <Navbar />
        <LoginComponent />
        <Footer />
      </div>
    </ContextProvider>
  );
}
