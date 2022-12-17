import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import HomeLayout from "../islands/HomeLayout.tsx";
import { State } from "./_middleware.tsx";
import { User } from "supabase";
import FavoriteLayout from "../islands/FavoriteLayout.tsx";

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
        <title>PostSnaps</title>
        <link rel="stylesheet" href={asset("../globals.css")} />
        <meta name="og:title" content="PostSnaps" />
        <meta
          name="og:description"
          content="Create beatiful screenshots of any tweet"
        />
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
