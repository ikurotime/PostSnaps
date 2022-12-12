import { useEffect, useRef, useState } from "preact/hooks";
import { Ref } from "preact";
import { Resizable } from "react-resizable";
import { getTweetData } from "../routes/index.tsx";
import html2canvas from "html2canvas";
import TwitterIcon from "../components/TwitterIcon.tsx";
import Input from "../components/Input.tsx";
import TweetContainer from "../components/TweetContainer.tsx";
import BottomBar from "../components/BottomBar.tsx";
import Toast from "../components/Toast.tsx";

export type UserData = {
  name: string;
  username: string;
  profile_image_url: string;
};
export type TweetData = {
  text: string;
  created_at: string;
  public_metrics: {
    like_count: number;
    retweet_count: number;
    reply_count: number;
    quote_count: number;
  };
};
export type MediaType = {
  media_key: string;
  type: string;
  url: string;
};
type Content = {
  data: TweetData[];
  includes: {
    users: UserData[];
    media: MediaType[];
  };
};

const ResizableBox = ({ content }: { content: Content }) => {
  /* const [tweetData, setTweetData] = useState<TweetData>({
    text: "Paste a tweet URL to get started!",
    created_at: "12/12/2022 13:13",
    public_metrics: {
      like_count: 256,
      retweet_count: 43,
      reply_count: 24,
      quote_count: 5,
    },
  }); */
  const [tweetContent, setTweetContent] = useState<Content>({
    data: [
      {
        text: "Paste a tweet URL to get started!",
        created_at: "12/12/2022 13:13",
        public_metrics: {
          like_count: 256,
          retweet_count: 43,
          reply_count: 24,
          quote_count: 5,
        },
      },
    ],
    includes: {
      users: [
        {
          name: "David Huertas",
          username: "ikurotime",
          profile_image_url:
            "https://pbs.twimg.com/profile_images/1585667050718085120/LumQqxjx_400x400.jpg",
        },
      ],
      media: [
        {
          media_key: "",
          type: "",
          url: "",
        },
      ],
    },
  });
  const [tweetId, setTweetId] = useState<string>("");
  /* const [user, setUser] = useState<UserData>({
    name: "David Huertas",
    username: "ikurotime",
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1585667050718085120/LumQqxjx_400x400.jpg",
  });
  const [attachment, setAttachment] = useState<MediaType>({
    media_key: "",
    type: "",
    url: "",
  }); */
  const [style, setStyle] = useState<string>("style-1");
  const [isToastShown, setIsToastShown] = useState<boolean>(false);
  const handleChange = (e: any) => {
    setTweetId(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    getTweetData(tweetId).then((res) => {
      setTweetContent(res);
    });
  };
  const changeStyle = (style: string) => {
    setStyle(style);
  };
  const captureElement = useRef<HTMLDivElement>(null);
  function saveScreenshot(canvas: any) {
    const fileName = "postsnap";
    const link = document.createElement("a");
    link.download = fileName + ".png";
    canvas.toBlob(function (blob: Blob) {
      link.href = URL.createObjectURL(blob);
      link.click();
    });
  }
  function copyToClipboard(canvas: any) {
    canvas.toBlob(function (blob: Blob) {
      navigator.clipboard
        .write([
          new ClipboardItem(
            Object.defineProperty({}, blob.type, {
              value: blob,
              enumerable: true,
            }),
          ),
        ]);
    });
  }

  const getImage = (type: string) => {
    if (captureElement && captureElement.current) {
      html2canvas(captureElement.current, {
        allowTaint: true,
        useCORS: true,
      }).then(type === "save" ? saveScreenshot : copyToClipboard);
    }
  };
  const handleToast = () => {
    setIsToastShown(true);
    setTimeout(() => {
      setIsToastShown(false);
    }, 2000);
  };
  useEffect(() => {
    if (content?.data === undefined) return;
    setTweetContent(content);
  }, [content]);

  return (
    <>
      <Toast text="Image copied" isToastShown={isToastShown} />
      <Input
        handleChange={handleChange}
        tweetId={tweetId}
        onSubmit={onSubmit}
      />
      <TweetContainer
        captureElement={captureElement}
        style={style}
        tweetData={tweetContent?.data[0]}
        attachment={tweetContent?.includes.media[0]}
        user={tweetContent?.includes.users[0]}
      />
      <BottomBar
        getImage={getImage}
        style={style}
        changeStyle={changeStyle}
        handleToast={handleToast}
      />
    </>
  );
};

export default ResizableBox;
