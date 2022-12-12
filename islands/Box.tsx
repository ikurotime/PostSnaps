import {useEffect, useState,useRef} from 'preact/hooks';
import { Ref } from 'preact';
import { Resizable } from 'react-resizable';
import { getTweetData } from '../routes/index.tsx';
import html2canvas from 'html2canvas';
import TwitterIcon from '../components/TwitterIcon.tsx';

type UserData = {
  name: string;
  username: string;
  profile_image_url: string;
};
type TweetData = {
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

const ResizableBox = ({content}:{content:Content}) => {
  const [tweetData, setTweetData] = useState<TweetData>({text:"Paste a tweet URL to get started!",created_at: "12/12/2022 13:13",public_metrics:{like_count:256,retweet_count:43,reply_count:24,quote_count:5}})
  const [user, setUser] = useState<UserData>({name:"David Huertas",username:"ikurotime",profile_image_url:"https://pbs.twimg.com/profile_images/1585667050718085120/LumQqxjx_400x400.jpg"});
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

  const captureElement = useRef<HTMLElement>(null); 
  const getImage = () => {
    if (captureElement && captureElement.current) {
      html2canvas(captureElement.current, { allowTaint: true }).then(canvas => {
        document.body.appendChild(canvas);
      });
    }
  };
 
  return (
    <>
    <form onSubmit={onSubmit}>
    <input class='w-full rounded-lg p-3 bg-gray-700 text-white border-2 border-gray-800' onInput={handleChange} value={tweetId}/>
    </form>
    <div
      id="capture"
      ref={captureElement as Ref<HTMLDivElement>}
    >
      <div className="relative flex justify-center items-center style-1 rounded-xl shadow-2xl scale-90 p-5 min-h-[462px] min-w-[425px] ">
        <div id="glassmorphism" className='p-6 w-10/12 h-3/6' >
          <div className="flex flex-col items-center justify-between w-full h-full gap-3">
            <div className="flex justify-between w-full">
            <div className='flex flex-row justify-start gap-4 w-full'>
                <img src={user.profile_image_url} className="rounded-full w-12 h-12" />
              <div className='flex flex-col'>
                <span class='text-xl font-semibold'>{user.name}</span>
                <span class='text-base text-gray-700' >@{user.username}</span>
              </div>
            </div>
            <TwitterIcon/>
            </div>

          <p class='self-start whitespace-pre-line text-2xl'>{tweetData.text}</p>
          <div className='flex self-start gap-2'>
          {tweetData?.created_at && <span class='text-gray-700'>{new Date(tweetData.created_at).toLocaleString()}</span>}
          </div>
          <div className='flex self-start gap-2'>
          {tweetData?.public_metrics?.like_count > 0 && <span class='text-gray-700'><strong class="text-black">{tweetData.public_metrics.like_count}</strong> likes</span>}
          {tweetData?.public_metrics?.retweet_count > 0 && <span class='text-gray-700'><strong class="text-black">{tweetData.public_metrics.retweet_count}</strong> retweets</span>}
          {tweetData?.public_metrics?.reply_count > 0 && <span class='text-gray-700'><strong class="text-black">{tweetData.public_metrics.reply_count}</strong> replies</span>}
          {tweetData?.public_metrics?.quote_count > 0 && <span class='text-gray-700'><strong class="text-black">{tweetData.public_metrics.quote_count}</strong> quotes</span>}
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class='bg-gray-700 p-5 rounded-lg'>
        <button class='bg-gray-600 p-3 rounded text-white' onClick={() => getImage()}>
        Export As PNG
      </button>
    </div>
    </>
  );
};

export default ResizableBox;
