import { useState } from "preact/hooks";
import { useAppState } from "../components/ContextProvider.tsx";
import { getTweetData } from "../routes/index.tsx";

export default function Input() {
  const { dispatch } = useAppState();
  const [tweetId, setTweetId] = useState("");
  const handleChange = (e: any) => {
    setTweetId(e.target.value);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    const statusID = tweetId?.split("/").pop()!.split("?").shift() || "";
    if (window.location.pathname !== "/") {
      window.location.assign("/?tweetId=" + statusID);
    } else {
      window.location.assign("?tweetId=" + statusID);
      getTweetData(statusID).then((res) => {
        dispatch({ type: "SET_TWEET_CONTENT", payload: res });
      });
    }
  };

  return (
    <form
      class="max-w-[500px] flex-1 z-10 "
      onSubmit={onSubmit}
    >
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only text-white"
      >
        Search
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            >
            </path>
          </svg>
        </div>
        <input
          type="search"
          onInput={handleChange}
          value={tweetId}
          id="default-search"
          class="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Paste a link of a tweet..."
          required
        />
        <button
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800  hover:scale-105  transition duration-300 ease-in-out"
        >
          Search
        </button>
      </div>
    </form>
  );
}
