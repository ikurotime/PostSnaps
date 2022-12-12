import { Ref } from "preact";
import type { MediaType, TweetData, UserData } from "../islands/Box.tsx";
import TwitterIcon from "./TwitterIcon.tsx";

type Props = {
  captureElement: Ref<HTMLDivElement>;
  attachment: MediaType;
  style: string;
  user: UserData;
  tweetData: TweetData;
};

export default function TweetContainer(
  { captureElement, style, user, tweetData, attachment }: Props,
) {
  return (
    <div
      id="container"
      ref={captureElement as Ref<HTMLDivElement>}
      className={"relative flex justify-center items-center   rounded-xl shadow-2xl scale-90 p-5 min-h-[462px] min-w-[425px] " +
        style}
    >
      <div id="glassmorphism" className="p-6 min-w-[80%] h-auto w-auto">
        <div className="flex flex-col items-center justify-between w-full h-full gap-3">
          <div className="flex justify-between w-full">
            <div className="flex flex-row justify-start gap-4 w-full">
              <img
                src={user.profile_image_url}
                className="rounded-full w-12 h-12"
              />
              <div className="flex flex-col">
                <span class="text-xl font-semibold">{user.name}</span>
                <span class="text-base text-gray-700">@{user.username}</span>
              </div>
            </div>
            <TwitterIcon />
          </div>

          <p class="self-start whitespace-pre-line text-2xl">
            {tweetData.text.split("https").shift()}
          </p>
          {attachment && (
            <img
              src={attachment.url}
              className="rounded-xl w-3/6 object-cover"
            />
          )}
          <div className="flex self-start gap-2">
            {tweetData?.created_at && (
              <span class="text-gray-700">
                {new Date(tweetData.created_at).toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex self-start gap-2">
            {tweetData?.public_metrics?.like_count > 0 && (
              <span class="text-gray-700">
                <strong class="text-black">
                  {tweetData.public_metrics.like_count}
                </strong>{" "}
                likes
              </span>
            )}
            {tweetData?.public_metrics?.retweet_count > 0 && (
              <span class="text-gray-700">
                <strong class="text-black">
                  {tweetData.public_metrics.retweet_count}
                </strong>{" "}
                retweets
              </span>
            )}
            {tweetData?.public_metrics?.reply_count > 0 && (
              <span class="text-gray-700">
                <strong class="text-black">
                  {tweetData.public_metrics.reply_count}
                </strong>{" "}
                replies
              </span>
            )}
            {tweetData?.public_metrics?.quote_count > 0 && (
              <span class="text-gray-700">
                <strong class="text-black">
                  {tweetData.public_metrics.quote_count}
                </strong>{" "}
                quotes
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
