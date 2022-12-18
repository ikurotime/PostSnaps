import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import Footer from "../components/Footer.tsx";
import Navbar from "../islands/Navbar.tsx";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>PostSnaps - Privacy Policy</title>
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

      <Navbar />
      <div className="min-h-screen">
        <div class="mt-24 max-w-screen-lg mx-auto text-white bg-gray-800 p-10 rounded-lg gap-3 flex flex-col">
          <h1 class="text-4xl ">Privacy Policy</h1>
          <p>
            At PostSnaps, we are committed to protecting the privacy of our
            users. This Privacy Policy outlines the types of personal
            information that we collect and how that information is used.
          </p>

          <h3 class="font-bold">Information We Collect</h3>
          <p>
            We collect the following types of personal information from our
            users: <br />

            Usernames Email addresses We collect this information through forms
            on our website, such as registration and login forms. This
            information is used to allow users to log in to the website and save
            their posts.
          </p>
          <h3 class="font-bold">How We Use Your Information</h3>
          <p>
            We use the personal information that we collect for the following
            purposes: <br />

            - To allow users to log in to the website and access their saved
            posts <br />

            We will not share your personal information with any third parties.
          </p>

          <h3 class="font-bold">Your Rights</h3>
          <p>
            You have the right to access, correct, or delete your personal
            information at any time. You can exercise these rights by contacting
            us at davidhuertasortiz@gmail.com.
          </p>
          <h3 class="font-bold">Data Protection</h3>
          <p>
            We take reasonable steps to protect the personal information that we
            collect from our users. We use secure servers and follow industry
            best practices to ensure that your information is secure.
          </p>

          <h3 class="font-bold">Children's Privacy</h3>
          <p>
            Our website is not directed at children under 13, and we do not
            knowingly collect personal information from children under 13. If we
            become aware that we have collected personal information from a
            child under 13, we will take steps to delete that information as
            soon as possible.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
