import { useState } from "preact/hooks";
import { useAppState } from "../components/ContextProvider.tsx";
import { SignUpForm } from "../components/SignUpForm.tsx";
import Toast from "../components/Toast.tsx";

export default function SignUpComponent() {
  const { dispatch } = useAppState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeat_password: "",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    dispatch({
      type: "SET_TOAST_TYPE",
      payload: "error",
    });
    if (formData.password !== formData.repeat_password) {
      dispatch({
        type: "SET_TOAST_MESSAGE",
        payload: "Passwords do not match",
      });
      dispatch({
        type: "SET_TOAST",
        payload: true,
      });
      setLoading(false);

      return;
    }
    if (formData.username.length < 3) {
      dispatch({
        type: "SET_TOAST_MESSAGE",
        payload: "Username must be at least 3 characters long",
      });
      dispatch({
        type: "SET_TOAST",
        payload: true,
      });
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      dispatch({
        type: "SET_TOAST_MESSAGE",
        payload: "Password must be at least 6 characters long",
      });
      dispatch({
        type: "SET_TOAST",
        payload: true,
      });
      setLoading(false);
      return;
    }
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(async (res) => {
      if (res.status === 200) {
        window.location.href = "/";
      } else {
        const { message } = await res.json();
        dispatch({
          type: "SET_TOAST_MESSAGE",
          payload: message,
        });
        dispatch({
          type: "SET_TOAST",
          payload: true,
        });
        setLoading(false);
      }
    });
  };
  return (
    <section>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <Toast />
            <SignUpForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
