import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import { User } from "supabase";
import HomeLayout from "../islands/HomeLayout.tsx";
import { State } from "./_middleware.tsx";

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
type Data = {
  tweetId: string;
  user: User | null;
};
export const handler: Handlers<Data, State> = {
  GET(req, ctx) {
    const params = new URL(req.url);
    const tweetId = params.searchParams.get("tweetId") || "";
    const data = {
      tweetId,
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
          content="Create beautiful screenshots of tweets and share them with your friends, followers, and on social media. With PostSnaps, you can easily capture and share the most memorable, funny, or inspiring moments on Twitter. Whether you want to share a tweet from a celebrity, a politician, or a friend, PostSnaps makes it easy to capture and share the tweet. So why wait? Try PostSnaps today and start sharing your favorite tweets in style!"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image"
          content={"https://nitjkhytnaowbkuggtwa.functions.supabase.co/ogImage/?tweetId=" +
            data.tweetId}
        />
        <meta name="twitter:site" content="@ikurotime" />
        <meta name="twitter:title" content="PostSnaps" />
        <meta
          name="twitter:description"
          content="Create beautiful screenshots of tweets and share them with your friends, followers, and on social media. With PostSnaps, you can easily capture and share the most memorable, funny, or inspiring moments on Twitter. Whether you want to share a tweet from a celebrity, a politician, or a friend, PostSnaps makes it easy to capture and share the tweet. So why wait? Try PostSnaps today and start sharing your favorite tweets in style!"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image:src"
          content={"https://nitjkhytnaowbkuggtwa.functions.supabase.co/ogImage/?tweetId=" +
            data.tweetId}
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.5.5/dist/flowbite.min.css"
        />
      </Head>
      <HomeLayout
        user={data.user}
        liked_post={data.liked_post}
      />

      <script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js"></script>
    </>
  );
}
