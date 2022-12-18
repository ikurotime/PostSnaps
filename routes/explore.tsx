import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import { User } from "supabase";
import ExploreLayout from "../islands/ExploreLayout.tsx";
import { State } from "./_middleware.tsx";

type Data = {
  tweetId: string;
  user: User | null;
};
export const handler: Handlers<Data, State> = {
  GET(req, ctx) {
    const params = new URL(req.url);
    const tweetId = params.searchParams.get("tweetId") || "";
    const data = { tweetId, user: ctx.state.auth?.user };
    return ctx.render(data);
  },
};
export default function Explore({ data }: PageProps) {
  return (
    <>
      <Head>
        <title>PostSnaps - Explore</title>
        <link rel="stylesheet" href={asset("../globals.css")} />
        <meta name="og:title" content="PostSnaps - Explore" />
        <meta
          name="keywords"
          content="screenshot tweets, tweet capture, custom tweet screenshots, share tweets, social media sharing, twitter moments, celebrity tweets, politician tweets, friend tweets, memorable tweets, funny tweets, inspiring tweets, deno, deno fresh, supabase, supabase functions"
        />
        <meta
          name="og:description"
          content="Discover the latest and greatest tweets from a variety of sources, including celebrities, politicians, and your friends and followers. With PostSnaps, it's easy to find and share the most memorable, funny, or inspiring moments on Twitter. Simply use the search bar to find a specific tweet or topic, or browse through the trending tweets to see what's hot right now."
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image"
          content={"https://nitjkhytnaowbkuggtwa.functions.supabase.co/ogImage/"}
        />
        <meta name="twitter:site" content="@ikurotime" />
        <meta name="twitter:title" content="PostSnaps" />
        <meta
          name="twitter:description"
          content="Discover the latest and greatest tweets from a variety of sources, including celebrities, politicians, and your friends and followers. With PostSnaps, it's easy to find and share the most memorable, funny, or inspiring moments on Twitter. Simply use the search bar to find a specific tweet or topic, or browse through the trending tweets to see what's hot right now."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image:src"
          content={"https://nitjkhytnaowbkuggtwa.functions.supabase.co/ogImage/"}
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.5.5/dist/flowbite.min.css"
        />
      </Head>
      <ExploreLayout user={data.user} />

      <script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js"></script>
    </>
  );
}
