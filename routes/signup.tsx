import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import ContextProvider from "../components/ContextProvider.tsx";
import SignUpComponent from "../components/SignUpComponent.tsx";
import Navbar from "../islands/Navbar.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    const params = new URL(req.url);
    const tweetId = params.searchParams.get("tweetId") || "";
    return ctx.render(tweetId);
  },
};
export default function signup({ data }: PageProps) {
  return (
    <>
      <Head>
        <title>PostSnaps - Sign up</title>
        <meta name="description" content="PostSnaps" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image"
          content={"https://nitjkhytnaowbkuggtwa.functions.supabase.co/ogImage/?tweetId=" +
            data}
        />
        <meta name="twitter:site" content="@ikurotime" />
        <meta name="twitter:title" content="PostSnaps" />
        <meta
          name="twitter:description"
          content="Create beatiful screenshots of any tweet"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image:src"
          content={"https://nitjkhytnaowbkuggtwa.functions.supabase.co/ogImage/?tweetId=" +
            data}
        />
        <link rel="stylesheet" href={asset("../globals.css")} />
      </Head>
      <ContextProvider>
        <Navbar />
        <SignUpComponent />
      </ContextProvider>
    </>
  );
}
