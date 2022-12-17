import { Ref } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useAppState } from "../components/ContextProvider.tsx";
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
    //get width and height of container
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
      dispatch({ type: "SET_TWEET_LOADING", payload: true });
      getTweetData(statusID).then((res) => {
        dispatch({ type: "SET_TWEET_CONTENT", payload: res });
        dispatch({ type: "SET_TWEET_LOADING", payload: false });
      });
    } else {
      dispatch({ type: "SET_TWEET_LOADING", payload: false });
    }
  }, []);
  return (
    tweetLoading
      ? (
        <div class="w-full h-60 grid place-items-center">
          <div role="status">
            <svg
              class="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )
      : (
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
                {isLogo ? <TwitterIcon /> : null}
              </div>

              <p class="self-start whitespace-pre-line text-2xl">
                {tweetContent?.data[0].text.split("https").shift()}
              </p>

              {tweetContent?.includes?.media?.length === 1 && (
                <div class="grid grid-cols-1 grid-rows-1 place-items-center gap-1 ">
                  {tweetContent?.includes?.media?.map((content) => (
                    <img
                      src={content.url}
                      className="rounded-xl w-3/6 object-cover"
                    />
                  ))}
                </div>
              )}
              {tweetContent?.includes?.media?.length === 2 && (
                <div class="grid grid-cols-2 grid-rows-1 place-items-center gap-1 ">
                  {tweetContent?.includes?.media?.map((content) => (
                    <img
                      src={content.url}
                      className="rounded-xl w-3/6 object-cover"
                    />
                  ))}
                </div>
              )}
              {tweetContent?.includes?.media?.length === 3 && (
                <div class="grid grid-cols-2 grid-rows-2 place-items-center gap-1 ">
                  {tweetContent?.includes?.media?.map((content) => (
                    <img
                      src={content.url}
                      className="rounded-xl w-5/6 object-cover"
                    />
                  ))}
                </div>
              )}
              <div className="flex self-start gap-2">
                {tweetContent?.data[0]?.created_at && (
                  <span class="text-gray-700">
                    {new Date(tweetContent?.data[0].created_at)
                      .toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex self-start gap-2">
                {tweetContent?.data[0]?.public_metrics?.like_count > 0 && (
                  <span class="text-gray-700">
                    <strong class="text-black">
                      {tweetContent?.data[0].public_metrics.like_count}
                    </strong>{" "}
                    likes
                  </span>
                )}
                {tweetContent?.data[0]?.public_metrics?.retweet_count > 0 && (
                  <span class="text-gray-700">
                    <strong class="text-black">
                      {tweetContent?.data[0].public_metrics.retweet_count}
                    </strong>{" "}
                    retweets
                  </span>
                )}
                {tweetContent?.data[0]?.public_metrics?.reply_count > 0 && (
                  <span class="text-gray-700">
                    <strong class="text-black">
                      {tweetContent?.data[0].public_metrics.reply_count}
                    </strong>{" "}
                    replies
                  </span>
                )}
                {tweetContent?.data[0]?.public_metrics?.quote_count > 0 && (
                  <span class="text-gray-700">
                    <strong class="text-black">
                      {tweetContent?.data[0].public_metrics.quote_count}
                    </strong>{" "}
                    quotes
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )
  );
}
