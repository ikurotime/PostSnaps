import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import { User } from "supabase";
import FavoriteLayout from "../islands/FavoriteLayout.tsx";
import { State } from "./_middleware.tsx";

type Data = {
  user: User | null;
};
export const handler: Handlers<Data, State> = {
  GET(_req, ctx) {
    const data = {
      user: ctx.state.auth?.user,
      liked_post: ctx.state.liked_post,
    };
    return ctx.render(data);
  },
};
export default function Home({ data }: PageProps) {
  return (
    <>
      <Head>
        <title>PostSnaps - Favorites</title>
        <link rel="stylesheet" href={asset("../globals.css")} />
        <meta name="og:title" content="PostSnaps - Favorites" />
        <meta
          name="keywords"
          content="screenshot tweets, tweet capture, custom tweet screenshots, share tweets, social media sharing, twitter moments, celebrity tweets, politician tweets, friend tweets, memorable tweets, funny tweets, inspiring tweets, deno, deno fresh, supabase, supabase functions"
        />
        <meta
          name="og:description"
          content="Find all of the tweets that you have saved as favorites or liked using our platform. With PostSnaps, it's easy to capture and share the most memorable, funny, or inspiring moments on Twitter, and this page is the perfect place to keep track of all of your favorite tweets in one place."
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
          content="Find all of the tweets that you have saved as favorites or liked using our platform. With PostSnaps, it's easy to capture and share the most memorable, funny, or inspiring moments on Twitter, and this page is the perfect place to keep track of all of your favorite tweets in one place."
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
      <FavoriteLayout user={data.user} />
      <script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js"></script>
    </>
  );
}
