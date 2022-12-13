import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import ContextProvider from "../components/ContextProvider.tsx";
import LoginComponent from "../components/LoginComponent.tsx";
import Navbar from "../islands/Navbar.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const params = new URL(req.url);
    const tweetId = params.searchParams.get("tweetId") || "";
    return ctx.render(tweetId);
  },
};
export default function login({ data }: PageProps) {
  return (
    <>
      <Head>
        <title>PostSnaps - Login</title>
        <meta name="description" content="PostSnaps" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:url"
          content={"https://nitjkhytnaowbkuggtwa.functions.supabase.co/ogImage/?tweetId=" +
            data.tweetId}
        />
        <link rel="stylesheet" href={asset("../globals.css")} />
      </Head>
      <ContextProvider>
        <Navbar />
        <LoginComponent />
      </ContextProvider>
    </>
  );
}
