import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import ContextProvider from "../components/ContextProvider.tsx";
import LoginComponent from "../islands/LoginComponent.tsx";
import Navbar from "../islands/Navbar.tsx";

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
        <meta name="og:title" content="PostSnaps - Login" />
        <meta
          name="keywords"
          content="screenshot tweets, tweet capture, custom tweet screenshots, share tweets, social media sharing, twitter moments, celebrity tweets, politician tweets, friend tweets, memorable tweets, funny tweets, inspiring tweets, deno, deno fresh, supabase, supabase functions"
        />
        <meta
          name="description"
          content="Welcome to the PostSnaps login page! Here you can access your account and start creating custom screenshots of tweets to share with your friends and followers. Simply enter your email address and password to get started. Don't have an account yet? No problem! You can easily sign up for PostSnaps and start capturing and sharing your favorite tweets in just a few clicks."
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
          content="Welcome to the PostSnaps login page! Here you can access your account and start creating custom screenshots of tweets to share with your friends and followers. Simply enter your email address and password to get started. Don't have an account yet? No problem! You can easily sign up for PostSnaps and start capturing and sharing your favorite tweets in just a few clicks."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image:src"
          content={"https://nitjkhytnaowbkuggtwa.functions.supabase.co/ogImage/"}
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
