import {useEffect, useState,useRef} from 'preact/hooks';
import { RefObject } from 'preact';
import { Resizable } from 'react-resizable';
import { getTweetData } from '../routes/index.tsx';
import html2canvas from 'html2canvas';


const ResizableBox = ({content}:{content?:any}) => {
  const [tweetData, setTweetData] = useState<any>("loading...")
  const [user, setUser] = useState<any>("loading...")
  useEffect(() => {
    setTweetData(content.data[0]);
    setUser(content.includes.users[0]);
  }, [content]);
 
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
  const componentRef = useRef(null);
  const getImage = () => {
    html2canvas(document.getElementById("capture") as HTMLElement, { allowTaint : true }).then(canvas => {
      document.body.appendChild(canvas)
  });
  }
  return (
    <>
    <form onSubmit={onSubmit}>
    <input onInput={handleChange} value={tweetId}/>
    </form>
    <div
      height={600}
      width={440}
      id="capture"
    >
      <div className="flex justify-center items-center style-1 rounded shadow-2xl scale-90" style={{width: '600px', height:  '440px'}}>
        <div id="glassmorphism" className='p-6 w-10/12 h-3/6' >
          <div className="flex flex-col items-center justify-between w-full h-full">
            <div className='flex flex-row justify-start gap-4 w-full'>
            <img src={user.profile_image_url} className="rounded-full w-12 h-12" />
            <div className='flex flex-col'>
            <strong>{user.name}</strong>
            <span>@{user.username}</span>
            </div>
            </div>
          {tweetData.text}
          <div className='flex self-start gap-2'>
          {tweetData?.created_at && <span>{new Date(tweetData.created_at).toLocaleString()}</span>}
          </div>
          <div className='flex self-start gap-2'>
          {tweetData?.public_metrics?.like_count > 0 && <span>{tweetData.public_metrics.like_count} likes</span>}
          {tweetData?.public_metrics?.retweet_count > 0 && <span>{tweetData.public_metrics.retweet_count} retweets</span>}
          {tweetData?.public_metrics?.reply_count > 0 && <span>{tweetData.public_metrics.reply_count} replies</span>}
          {tweetData?.public_metrics?.quote_count > 0 && <span>{tweetData.public_metrics.quote_count} quotes</span>}
          </div>
          </div>
        </div>
      </div>
    </div>
        <button onClick={() => getImage()}>
        Export As PNG
      </button>
    </>
  );
};

export default ResizableBox;
