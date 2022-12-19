import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import { User } from "supabase";
import HomeLayout from "../islands/HomeLayout.tsx";
import { State } from "./_middleware.tsx";

/* export async function getTweetData(statusID: string) {
  return await fetch("/api/get-tweet-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      statusID: statusID,
    }),
  }).then((res) => res.json());
} */
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
      tweetUser: ctx.state.tweetData?.includes?.users?.[0]?.username,
      tweetText: ctx.state.tweetData?.data?.[0]?.text?.split("https").shift(),
    };

    return ctx.render(data);
  },
};
export default function Home({ data }: PageProps) {
  return (
    <>
      <Head>
        <title>
          {data.tweetUser ? `PostSnaps - @${data.tweetUser}` : "PostSnaps"}
        </title>
        <link rel="stylesheet" href={asset("../globals.css")} />
        <meta
          name="og:title"
          content={data.tweetText
            ? `@${data.tweetUser} on Twitter - PostSnaps`
            : "PostSnaps"}
        />
        <meta
          name="og:description"
          content={data.tweetId
            ? data.tweetText
            : "Create beautiful screenshots of tweets and share them with your friends, followers, and on social media. With PostSnaps, you can easily capture and share the most memorable, funny, or inspiring moments on Twitter."}
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
          content={data.tweetId
            ? data.tweetText
            : "Create beautiful screenshots of tweets and share them with your friends, followers, and on social media. With PostSnaps, you can easily capture and share the most memorable, funny, or inspiring moments on Twitter."}
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
