import { useEffect, useState } from "preact/hooks";
import { User } from "supabase";
import ContextProvider from "../components/ContextProvider.tsx";
import Footer from "../components/Footer.tsx";
import { Spinner } from "../components/Spinner.tsx";
import Toast from "../components/Toast.tsx";
import { supabase } from "../publicSupabase.ts";
import Navbar from "./Navbar.tsx";

const FavoriteLayout = ({ user }: { user: User }) => {
  const [likedPost, setLikedPost] = useState<any[] | null>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("liked_posts").select("*,content:posts(post_id,image)").eq(
      "user_id",
      user?.id,
    )
      .then(
        (res) => {
          setLikedPost(res.data);
          setLoading(false);
        },
      );
  }, []);

  return (
    <ContextProvider>
      <div class="min-h-screen p-4 mx-auto max-w-screen-xl h-full">
        <div class="w-full min-h-screen m-auto flex flex-col justify-center py-14">
          <Toast />
          <Navbar user={user} />
          <div class="flex flex-col min-h-[95vh] bg-gray-900 rounded-lg p-5 my-3">
            <h1 class="text-4xl text-white font-bold my-2">Favorites</h1>
            {loading ? <Spinner /> : (
              likedPost && likedPost.length > 0
                ? (
                  <div class="grid place-items-center justify-center gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {likedPost.map((post) => (
                      <div class="hover:scale-105 transition-all hover:cursor-pointer gap-3">
                        <a href={post.link}>
                          <img
                            src={post.content.image}
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
      <Footer />
    </ContextProvider>
  );
};

export default FavoriteLayout;
