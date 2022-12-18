import { useAppState } from "./ContextProvider.tsx";

type Props = {};

export default function TweetAttatchments() {
  const { tweetContent } = useAppState();
  const getGridConfig = () => {
    const length = tweetContent?.includes?.media?.length;
    if (length >= 0) "grid-cols-1 grid-rows-1";
    if (length >= 2) "grid-cols-2 grid-rows-1";
    if (length >= 3) "grid-cols-2 grid-rows-3";
  };
  return (
    <div class={"grid place-items-center gap-1 " + getGridConfig()}>
      {tweetContent?.includes?.media?.map((content) => (
        <img
          src={content.url}
          className="rounded-xl w-3/6 object-cover"
        />
      ))}
    </div>
  );
}
