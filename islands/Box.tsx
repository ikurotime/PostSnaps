import { useEffect, useRef, useState } from "preact/hooks";
import { Ref } from "preact";
import { Resizable } from "react-resizable";
import { getTweetData } from "../routes/index.tsx";
import html2canvas from "html2canvas";
import TwitterIcon from "../components/TwitterIcon.tsx";
import Input from "../components/Input.tsx";
import TweetContainer from "../components/TweetContainer.tsx";
import BottomBar from "../components/BottomBar.tsx";

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
type Content = {
  data: TweetData[];
  includes: {
    users: UserData[];
  };
};

const ResizableBox = ({ content }: { content: Content }) => {
  const [tweetData, setTweetData] = useState<TweetData>({
    text: "Paste a tweet URL to get started!",
    created_at: "12/12/2022 13:13",
    public_metrics: {
      like_count: 256,
      retweet_count: 43,
      reply_count: 24,
      quote_count: 5,
    },
  });
  const [user, setUser] = useState<UserData>({
    name: "David Huertas",
    username: "ikurotime",
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1585667050718085120/LumQqxjx_400x400.jpg",
  });
  const [style, setStyle] = useState<string>("style-1");
  useEffect(() => {
    if (content?.data === undefined) return;
    setTweetData(content.data[0]);
    setUser(content.includes.users[0]);
  }, [content]);
  useEffect(() => {
    console.log(tweetData);
  }, [tweetData]);
  const [tweetId, setTweetId] = useState<string>("");
  const handleChange = (e: any) => {
    setTweetId(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    getTweetData(tweetId).then((res) => {
      setTweetData(res.data[0]);
      setUser(res.includes.users[0]);
    });
    console.log(tweetId);
  };
  const changeStyle = (style: string) => {
    setStyle(style);
  };
  const captureElement = useRef<HTMLDivElement>(null);
  const getImage = () => {
    if (captureElement && captureElement.current) {
      html2canvas(captureElement.current, { allowTaint: true }).then(
        (canvas) => {
          document.body.appendChild(canvas);
        },
      );
    }
  };

  return (
    <>
      <Input
        handleChange={handleChange}
        tweetId={tweetId}
        onSubmit={onSubmit}
      />
      <TweetContainer
        captureElement={captureElement}
        style={style}
        tweetData={tweetData}
        user={user}
      />
      <BottomBar getImage={getImage} style={style} changeStyle={changeStyle} />
    </>
  );
};

export default ResizableBox;
