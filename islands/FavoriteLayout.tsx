import Toast from "../components/Toast.tsx";

import ContextProvider from "../components/ContextProvider.tsx";

import Navbar from "./Navbar.tsx";
import { User } from "supabase";
import { useEffect, useState } from "preact/hooks";
import { supabase } from "../publicSupabase.ts";

const FavoriteLayout = ({ user }: { user: User }) => {
  const [likedPost, setLikedPost] = useState<any[] | null>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("liked_posts").select("*").eq("user_id", user?.id)
      .then(
        (res) => {
          setLikedPost(res.data);
          setLoading(false);
        },
      );
  }, []);
  useEffect(() => {
    console.log(likedPost);
  }, [likedPost]);

  return (
    <ContextProvider>
      <div class="min-h-screen p-4 mx-auto max-w-screen-xl h-full">
        <div class="w-full min-h-screen m-auto flex flex-col justify-center py-14">
          <Toast text="Copied to clipboard" />
          <Navbar user={user} />
          <div class="flex flex-col min-h-[95vh] bg-gray-900 rounded-lg p-5 my-3">
            <h1 class="text-4xl text-white font-bold my-2">Favorites</h1>
            {loading
              ? (
                <div class="w-full h-60 grid place-items-center">
                  <div role="status">
                    <svg
                      class="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              )
              : (
                likedPost && likedPost.length > 0
                  ? (
                    <div class="grid place-items-center justify-center gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {likedPost.map((post) => (
                        <div class="hover:scale-105 transition-all hover:cursor-pointer gap-3">
                          <a href={post.link}>
                            <img
                              src={post.image}
                              class="w-72 h-auto object-cover"
                            />
                          </a>
                        </div>
                      ))}
                    </div>
                  )
                  : (
                    <div class="flex flex-col items-center justify-center gap-3">
                      <h1 class="text-2xl text-white font-bold my-2">
                        No favorites yet
                      </h1>
                      <img
                        src="https://media.giphy.com/media/3o7TKSjRrfIPjeUGDK/giphy.gif"
                        class="w-96 h-auto object-cover rounded-lg"
                      />
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </ContextProvider>
  );
};

export default FavoriteLayout;
