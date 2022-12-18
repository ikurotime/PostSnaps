import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import { User } from "supabase";
import ChangeLayout from "../islands/ChangeLayout.tsx";
import { State } from "./_middleware.tsx";
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
export default function ChangePassword({ data }: PageProps) {
  return (
    <>
      <Head>
        <title>PostSnaps - Change Password</title>
        <meta name="og:title" content="PostSnaps - Change Password" />
        <meta
          name="keywords"
          content="screenshot tweets, tweet capture, custom tweet screenshots, share tweets, social media sharing, twitter moments, celebrity tweets, politician tweets, friend tweets, memorable tweets, funny tweets, inspiring tweets, deno, deno fresh, supabase, supabase functions"
        />
        <meta
          name="description"
          content="Create a new account and start using our platform to create custom screenshots of tweets and share them with your friends, followers, and on social media. With PostSnaps, it's easy to capture and share the most memorable, funny, or inspiring moments on Twitter."
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
          content="Create a new account and start using our platform to create custom screenshots of tweets and share them with your friends, followers, and on social media. With PostSnaps, it's easy to capture and share the most memorable, funny, or inspiring moments on Twitter."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image:src"
          content={"https://nitjkhytnaowbkuggtwa.functions.supabase.co/ogImage/"}
        />
        <link rel="stylesheet" href={asset("../globals.css")} />
      </Head>
      <ChangeLayout user={data.user} />
    </>
  );
}
