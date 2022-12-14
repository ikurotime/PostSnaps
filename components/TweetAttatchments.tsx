import { useAppState } from "./ContextProvider.tsx";

export default function TweetAttatchments({ tweetData }: { tweetData: any }) {
  const { tweetContent } = useAppState();
  const getGridConfig = () => {
    const length = tweetData?.includes?.media?.length ??
      tweetContent?.includes?.media?.length;
    if (length >= 3) return "grid-cols-2 grid-rows-2";
    if (length >= 2) return "grid-cols-2 grid-rows-1";
    if (length >= 0) return "grid-cols-1 grid-rows-1";
  };
  const getWidth = () => {
    const length = tweetData?.includes?.media?.length ??
      tweetContent?.includes?.media?.length;
    if (length >= 3) return "w-5/6";
    if (length >= 2) return "w-3/6";
    if (length >= 0) return "w-3/6";
  };

  return (
    <div class={"grid place-items-center gap-1 " + getGridConfig()}>
      {tweetContent?.includes?.media?.[0].url
        ? tweetContent?.includes?.media?.map((content) => (
          <img
            src={content.url}
            className={"rounded-xl object-cover " + getWidth()}
          />
        ))
        : (tweetData?.includes?.media?.map((content: any) => (
          <img
            src={content.url}
            className={"rounded-xl object-cover " + getWidth()}
          />
        )))}
    </div>
  );
}
