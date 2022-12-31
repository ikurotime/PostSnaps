import { createClient, Provider } from "supabase";
import { useState } from "preact/hooks";
import { useAppState } from "../components/ContextProvider.tsx";
import GithubIcon from "../components/GithubIcon.tsx";
import { LoginForm } from "../components/LoginForm.tsx";
import Toast from "../components/Toast.tsx";
import TwitterIcon from "../components/TwitterIcon.tsx";
//import { signInWith } from "../publicSupabase.ts";
export default function LoginComponent() {
  const supabase = createClient(
    "https://nitjkhytnaowbkuggtwa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdGpraHl0bmFvd2JrdWdndHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2ODc0OTAsImV4cCI6MTk4NjI2MzQ5MH0.BZRNf7yQgX8xqsvfnNROSgh6wOsDMUvYeis2M6Kh0-g",
  );
  const signInWith = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    return { data, error };
  };

  const { dispatch } = useAppState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status === 200) {
        window.location.href = "/";
      } else {
        setLoading(false);
        dispatch({
          type: "SET_TOAST_TYPE",
          payload: "error",
        });
        dispatch({
          type: "SET_TOAST_MESSAGE",
          payload: "Invalid email or password",
        });
        dispatch({
          type: "SET_TOAST",
          payload: true,
        });
        setTimeout(() => {
          dispatch({ type: "SET_TOAST", payload: false });
        }, 3000);
      }
    });
  };
  return (
    <section>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
            </h1>
            <div class="grid grid-cols-2 w-full">
              <button
                type="button"
                onClick={() => {
                  signInWith("twitter");
                }}
                class="text-white  bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2"
              >
                <div class="flex items-center">
                  <TwitterIcon className="mr-2 -ml-1 w-7 h-7 " />
                  Sign in with Twitter
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  signInWith("github");
                }}
                class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
              >
                <div className="flex items-center">
                  <GithubIcon className="mr-2 -ml-1 w-7 h-7 " />
                  Sign in with Github
                </div>
              </button>
            </div>

            <hr />
            <Toast />
            <LoginForm
              loading={loading}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
