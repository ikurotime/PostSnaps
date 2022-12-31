import confetti from "canvas-confetti";
import { useContext, useEffect, useState } from "preact/hooks";
import { User } from "supabase";
import BgColorButton from "../components/BgColorButton.tsx";
import { CopyClipboardIcon } from "../components/CopyClipboardIcon.tsx";
import { CopyIcon } from "../components/CopyIcon.tsx";
import { DownloadIcon } from "../components/DownloadIcon.tsx";
import EditButton from "../components/EditButton.tsx";
import { FavoriteIcon } from "../components/FavoriteIcon.tsx";
import TooltipButton from "../components/TooltipButton.tsx";
import { AppContext } from "../context/AppContext.ts";
//import { supabase } from "../publicSupabase.ts";
import { getImage } from "../utils.ts";
export default function BottomBar(
  { user, liked_post }: { user: User; liked_post: boolean },
) {
  const [liked, setLiked] = useState(liked_post);
  const {
    captureElement,
    dispatch,
    likes,
  } = useContext(
    AppContext,
  );
  const handleToast = () => {
    dispatch({ type: "SET_TOAST", payload: true });
    dispatch({ type: "SET_TOAST_MESSAGE", payload: "Copied to clipboard" });
    setTimeout(() => {
      dispatch({ type: "SET_TOAST", payload: false });
    }, 2000);
  };
  const handleFavorite = async () => {
    const url = new URL(window.location.href);
    const tweetId = url.searchParams.get("tweetId");
    setLiked(!liked);
    let image;
    if (liked === false) {
      confetti({
        particleCount: 20,
        spread: 20,
        origin: { y: 0.9, x: 0.48 },
      });

      image = await getImage(captureElement);
      dispatch({ type: "SET_LIKES", payload: likes + 1 });
    } else {
      dispatch({ type: "SET_LIKES", payload: likes - 1 });
    }
    /* supabase.functions.invoke("addBase64ImageToStorage", {
      body: {
        image,
        tweet_id: tweetId,
        user_id: user?.id,
        link: "/" + window.location.search,
      },
    }); */
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const tweetId = url.searchParams.get("tweetId");
    /*  supabase.from("liked_posts").select("*", { count: "exact" }).eq(
      "post_id",
      tweetId,
    ).then(({ count, error }) => {
      if (error) {
        console.log(error);
      }
      if (count) {
        dispatch({ type: "SET_LIKES", payload: count });
      }
    }); */
  }, []);

  return (
    <>
      {likes > 0 &&
        (
          <div class="absolute bottom-32 left-0 right-0 mx-auto max-w-[100px] flex justify-center gap-5 w-full p-2 border rounded-lg shadow-md bg-gray-800 border-gray-700 text-red-400">
            <FavoriteIcon liked={true} />
            <p class="text-white">{likes}</p>
          </div>
        )}
      <div class="absolute bottom-10 left-0 right-0 mx-auto max-w-[365px] md:max-w-[435px] flex justify-center gap-5 w-full p-2 border rounded-lg shadow-md bg-gray-800 border-gray-700 ">
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
          disabled={window?.location?.search === ""}
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
    </>
  );
}
