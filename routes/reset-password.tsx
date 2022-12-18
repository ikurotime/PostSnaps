import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import ResetLayout from "../islands/ResetLayout.tsx";

export default function ResetPassword() {
  return (
    <>
      <Head>
        <title>PostSnaps - Reset Password</title>
        <meta name="og:title" content="PostSnaps - Reset Password" />
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
      <ResetLayout />
    </>
  );
}
