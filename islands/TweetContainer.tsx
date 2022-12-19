import { Ref } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useAppState } from "../components/ContextProvider.tsx";
import { Spinner } from "../components/Spinner.tsx";
import TweetAttatchments from "../components/TweetAttatchments.tsx";
import TweetMetrics from "../components/TweetMetrics.tsx";
import TwitterIcon from "../components/TwitterIcon.tsx";
import { supabase } from "../publicSupabase.ts";
//import { getTweetData } from "../routes/index.tsx";

export default function TweetContainer(
  { tweetData, tweetText }: { tweetData: any; tweetText: string },
) {
  const {
    tweetContent,
    tweetLoading,
    selectedStyle,
    isOpaque,
    padding,
    isLogo,
    dispatch,
  } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const [containerXY, setContainerXY] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (ref) {
      dispatch({ type: "SET_CAPTURE_ELEMENT", payload: ref });
    }
    const container = ref.current;
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      setContainerXY({ x: Math.floor(width), y: Math.floor(height) });
    }
  }, [ref]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const statusID = urlParams.get("tweetId");

    if (statusID && !tweetData?.data?.[0]) {
      dispatch({ type: "SET_TOAST_TYPE", payload: "error" });
      dispatch({ type: "SET_TOAST_MESSAGE", payload: "Invalid Tweet URL" });
      dispatch({ type: "SET_TOAST", payload: true });
      dispatch({ type: "SET_TWEET_LOADING", payload: false });
      history.pushState({}, "", "/");
      setTimeout(() => {
        dispatch({ type: "SET_TOAST", payload: false });
      }, 3000);
      return;
    }
  }, []);

  return (
    tweetLoading ? <Spinner /> : (
      <div
        id="container"
        ref={ref as Ref<HTMLDivElement>}
        className={`relative flex justify-center items-center mx-auto rounded-xl shadow-2xl scale-[90%] p-${padding} transition-all ` +
          selectedStyle}
      >
        <div
          id={isOpaque ? "" : "glassmorphism"}
          className="p-6 h-auto w-auto rounded-lg bg-white border border-white border-opacity-[0.18]"
        >
          <div className="flex flex-col items-center justify-between w-full h-full gap-3">
            <div className="flex justify-between w-full">
              <div className="flex flex-row justify-start w-full gap-4">
                <img
                  src={tweetData?.includes?.users?.[0].profile_image_url ??
                    tweetContent?.includes?.users?.[0].profile_image_url}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col">
                  <span class="text-xl font-semibold">
                    {tweetData?.includes?.users?.[0].name ??
                      tweetContent?.includes?.users?.[0].name}
                  </span>
                  <span class="text-base text-gray-700">
                    @{tweetData?.includes?.users?.[0].username ??
                      tweetContent?.includes?.users?.[0].username}
                  </span>
                </div>
              </div>
              {isLogo ? <TwitterIcon className="w-10 h-10" /> : null}
            </div>

            <p class="self-start whitespace-pre-line text-2xl">
              {tweetText?.replace(/pic.twitter.com\/\w+/g, "") ??
                tweetContent?.data?.[0].text}
            </p>

            <TweetAttatchments tweetData={tweetData} />

            <div className="flex self-start gap-2">
              {(tweetData?.data?.[0]?.created_at ||
                tweetContent?.data?.[0]?.created_at) && (
                <span class="text-gray-700">
                  {new Date(
                    tweetData?.data[0].created_at ??
                      tweetContent?.data[0].created_at,
                  )
                    .toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex self-start gap-2">
              <TweetMetrics
                tweetData={tweetData}
                prop="like_count"
                label="likes"
              />
              <TweetMetrics
                tweetData={tweetData}
                prop="retweet_count"
                label="retweets"
              />
              <TweetMetrics
                tweetData={tweetData}
                prop="reply_count"
                label="replies"
              />
              <TweetMetrics
                tweetData={tweetData}
                prop="quote_count"
                label="quotes"
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
