import { useEffect, useState } from "preact/hooks";

import ContextProvider from "../components/ContextProvider.tsx";
import Footer from "../components/Footer.tsx";
import { Spinner } from "../components/Spinner.tsx";
import Toast from "../components/Toast.tsx";
import { createClient } from "supabase";
import Navbar from "./Navbar.tsx";

const ExploreLayout = ({ user }: { user: any }) => {
  const [posts, setPosts] = useState<any[] | null>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient(
    "https://nitjkhytnaowbkuggtwa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdGpraHl0bmFvd2JrdWdndHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2ODc0OTAsImV4cCI6MTk4NjI2MzQ5MH0.BZRNf7yQgX8xqsvfnNROSgh6wOsDMUvYeis2M6Kh0-g",
  );
  useEffect(() => {
    try {
      supabase.from("posts").select("*").order("created_at", {
        ascending: false,
      })
        .then(
          (res) => {
            setPosts(res.data);
            setLoading(false);
          },
        );
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ContextProvider>
      <div class="min-h-screen p-4 mx-auto max-w-screen-xl h-full">
        <div class="w-full min-h-screen m-auto flex flex-col justify-center py-14">
          <Toast />
          <Navbar user={user} />
          <div class="flex flex-col min-h-[95vh] bg-gray-900 rounded-lg p-10 my-3">
            <h1 class="text-4xl text-white font-bold mb-4">
              Explore posts
            </h1>
            {loading
              ? <Spinner />
              : (
                <div class="grid place-items-center justify-center gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {posts?.map((post) => (
                    <div class="hover:scale-105 transition-all hover:cursor-pointer gap-3">
                      <a href={post.link}>
                        <img
                          src={post.image}
                          class="w-72 object-fill"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
      <Footer />
    </ContextProvider>
  );
};

export default ExploreLayout;
