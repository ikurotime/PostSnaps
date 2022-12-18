import { Ref } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useAppState } from "../components/ContextProvider.tsx";
import { Spinner } from "../components/Spinner.tsx";
import TweetAttatchments from "../components/TweetAttatchments.tsx";
import TweetMetrics from "../components/TweetMetrics.tsx";
import TwitterIcon from "../components/TwitterIcon.tsx";
import { getTweetData } from "../routes/index.tsx";

export default function TweetContainer() {
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
  }, [containerXY]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const statusID = urlParams.get("tweetId");
    if (statusID) {
      getTweetData(statusID).then((res) => {
        dispatch({ type: "SET_TWEET_CONTENT", payload: res });
        dispatch({ type: "SET_TWEET_LOADING", payload: false });
      });
    } else {
      dispatch({ type: "SET_TWEET_LOADING", payload: false });
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
              <div className="flex flex-row justify-start gap-4 w-full">
                <img
                  src={tweetContent?.includes.users[0].profile_image_url}
                  className="rounded-full w-12 h-12"
                />
                <div className="flex flex-col">
                  <span class="text-xl font-semibold">
                    {tweetContent?.includes.users[0].name}
                  </span>
                  <span class="text-base text-gray-700">
                    @{tweetContent?.includes.users[0].username}
                  </span>
                </div>
              </div>
              {isLogo ? <TwitterIcon className="w-10 h-10" /> : null}
            </div>

            <p class="self-start whitespace-pre-line text-2xl">
              {tweetContent?.data[0].text.split("https").shift()}
            </p>

            <TweetAttatchments />

            <div className="flex self-start gap-2">
              {tweetContent?.data[0]?.created_at && (
                <span class="text-gray-700">
                  {new Date(tweetContent?.data[0].created_at)
                    .toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex self-start gap-2">
              <TweetMetrics prop="like_count" label="likes" />
              <TweetMetrics prop="retweet_count" label="retweets" />
              <TweetMetrics prop="reply_count" label="replies" />
              <TweetMetrics prop="quote_count" label="quotes" />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
