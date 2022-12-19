import { formatNumber } from "../utils.ts";
import { useAppState } from "./ContextProvider.tsx";

type Props = {
  prop: "like_count" | "quote_count" | "retweet_count" | "reply_count";
  label: string;
  tweetData?: any;
};

export default function TweetMetrics({ prop, label, tweetData }: Props) {
  const { tweetContent } = useAppState();
  return (
    <span class="text-gray-700">
      {(tweetData?.data?.[0]?.public_metrics[prop] > 0 ||
        tweetContent?.data?.[0]?.public_metrics[prop] > 0) &&
        (
          <>
            <strong class="text-black">
              {formatNumber(
                tweetData?.data?.[0].public_metrics[prop] ??
                  tweetContent?.data?.[0].public_metrics[prop],
              )}
            </strong>{" "}
            {label}
          </>
        )}
    </span>
  );
}
