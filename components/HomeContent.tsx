import { useEffect } from "preact/hooks";
import BottomBar from "../islands/BottomBar.tsx";
import Layout from "../islands/Layout.tsx";
//import { useAppState } from "../islands/Layout.tsx";
import TweetContainer from "../islands/TweetContainer.tsx";
import Navbar from "../islands/Navbar.tsx";
import ContextProvider from "../components/ContextProvider.tsx";

export default function HomeContent() {
  return (
    <>
      <Navbar />
      <TweetContainer />
      <BottomBar />
    </>
  );
}
