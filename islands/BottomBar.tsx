import { useContext, useState } from "preact/hooks";
import { User } from "supabase";
import BgColorButton from "../components/BgColorButton.tsx";
import { CopyClipboardIcon } from "../components/CopyClipboardIcon.tsx";
import { CopyIcon } from "../components/CopyIcon.tsx";
import { DownloadIcon } from "../components/DownloadIcon.tsx";
import EditButton from "../components/EditButton.tsx";
import { FavoriteIcon } from "../components/FavoriteIcon.tsx";
import TooltipButton from "../components/TooltipButton.tsx";
import { AppContext } from "../context/AppContext.ts";
import { getImage } from "../utils.ts";

export default function BottomBar(
  { user, liked_post }: { user: User; liked_post: boolean },
) {
  const [liked, setLiked] = useState(liked_post);
  const {
    captureElement,
    isOpaque,
    isLogo,
    padding,
    dispatch,
  } = useContext(
    AppContext,
  );
  const handleToast = () => {
    dispatch({ type: "SET_TOAST", payload: true });
    setTimeout(() => {
      dispatch({ type: "SET_TOAST", payload: false });
    }, 2000);
  };
  const handleFavorite = async () => {
    setLiked(!liked);
    const url = new URL(window.location.href);
    const tweetId = url.searchParams.get("tweetId");
    let image;
    if (liked === false) {
      image = await getImage(captureElement);
    }
    fetch("/api/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.id,
        tweet_id: tweetId,
        image,
        link: "/" + window.location.search,
      }),
    });
  };

  return (
    <div class="fixed bottom-10 left-0 right-0 mx-auto max-w-[435px] flex justify-center gap-5 w-full p-2 border rounded-lg shadow-md bg-gray-800 border-gray-700 ">
      <BgColorButton />
      <TooltipButton
        Icon={<DownloadIcon />}
        onClick={() => {
          getImage(captureElement, "save");
        }}
        tooltipId="tooltip-download"
        tooltipLabel="Download Image"
      />
      <TooltipButton
        Icon={<FavoriteIcon liked={liked} />}
        onClick={user ? handleFavorite : () => {
          window?.location?.assign("/login");
        }}
        tooltipId="tooltip-fav"
        tooltipLabel="Save as favorite"
      />
      <TooltipButton
        Icon={<CopyIcon />}
        onClick={() => {
          getImage(captureElement, "copy");
          handleToast();
        }}
        tooltipId="tooltip-copy"
        tooltipLabel="Copy Image to Clipboard"
      />
      <TooltipButton
        Icon={<CopyClipboardIcon />}
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          handleToast();
        }}
        tooltipId="tooltip-copy-link"
        tooltipLabel="Copy Link to Clipboard"
      />
      <EditButton />
    </div>
  );
}
