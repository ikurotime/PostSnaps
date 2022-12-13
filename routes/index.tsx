import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
//import Layout from "../islands/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import HomeContent from "../components/HomeContent.tsx";
import TweetContainer from "../islands/TweetContainer.tsx";
import BottomBar from "../islands/BottomBar.tsx";
import Layout from "../islands/Layout.tsx";
import ContextProvider, {
  useAppState,
} from "../components/ContextProvider.tsx";
import Navbar from "../islands/Navbar.tsx";
import { useEffect } from "https://esm.sh/v95/preact@10.11.0/hooks/src/index";

export async function getTweetData(statusID: string) {
  return await fetch("/api/get-tweet-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      statusID: statusID,
    }),
  }).then((res) => res.json());
}

export default function Home() {
  return (
    <>
      <Head>
        <title>PostSnaps</title>
        <link rel="stylesheet" href={asset("../globals.css")} />
        <link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.5.5/dist/flowbite.min.css"
        />
      </Head>
      <Layout />

      <script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js"></script>
    </>
  );
}
