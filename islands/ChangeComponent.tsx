import { useState } from "preact/hooks";
import { User } from "supabase";
import { ChangeForm } from "../components/ChangeForm.tsx";
import { useAppState } from "../components/ContextProvider.tsx";
import Toast from "../components/Toast.tsx";

export default function ChangeComponent({ user }: { user: User }) {
  const { dispatch } = useAppState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    password_confirm: "",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    fetch("/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: formData.password,
        user_id: user.id,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          dispatch({
            type: "SET_TOAST_TYPE",
            payload: "success",
          });
          dispatch({
            type: "SET_TOAST_MESSAGE",
            payload: "Password changed successfully",
          });
          dispatch({
            type: "SET_TOAST",
            payload: true,
          });
          setLoading(false);
          setTimeout(() => {
            dispatch({ type: "SET_TOAST", payload: false });
          }, 3000);
          return;
        } else {
          const data = await res.json();
          dispatch({
            type: "SET_TOAST_TYPE",
            payload: "error",
          });
          dispatch({
            type: "SET_TOAST_MESSAGE",
            payload: data.message,
          });
          dispatch({
            type: "SET_TOAST",
            payload: true,
          });
          setLoading(false);
          setTimeout(() => {
            dispatch({ type: "SET_TOAST", payload: false });
          }, 3000);
          return;
        }
      });
  };

  return (
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[90vh] lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Reset my password
          </h1>
          <Toast />
          <ChangeForm
            loading={loading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
