import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import SignupLayout from "../islands/SignupLayout.tsx";

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
        <meta name="og:title" content="PostSnaps - Sign up" />
        <meta
          name="keywords"
          content="screenshot tweets, tweet capture, custom tweet screenshots, share tweets, social media sharing, twitter moments, celebrity tweets, politician tweets, friend tweets, memorable tweets, funny tweets, inspiring tweets, deno, deno fresh, supabase, supabase functions"
        />
        <meta
          name="description"
          content="create a new account and start using our platform to create custom screenshots of tweets and share them with your friends, followers, and on social media. With PostSnaps, it's easy to capture and share the most memorable, funny, or inspiring moments on Twitter."
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
          content="create a new account and start using our platform to create custom screenshots of tweets and share them with your friends, followers, and on social media. With PostSnaps, it's easy to capture and share the most memorable, funny, or inspiring moments on Twitter."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image:src"
          content={"https://nitjkhytnaowbkuggtwa.functions.supabase.co/ogImage/?tweetId=" +
            data}
        />
        <link rel="stylesheet" href={asset("../globals.css")} />
      </Head>
      <SignupLayout />
    </>
  );
}
