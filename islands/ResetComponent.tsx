import { useState } from "preact/hooks";
import { useAppState } from "../components/ContextProvider.tsx";
import { ResetForm } from "../components/ResetForm.tsx";
import Toast from "../components/Toast.tsx";
import { supabase } from "../publicSupabase.ts";

export default function ResetComponent() {
  const { dispatch } = useAppState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: window.location.origin + "/change-password",
    }).then((res) => {
      if (res.error) {
        dispatch({
          type: "SET_TOAST_TYPE",
          payload: "error",
        });
        dispatch({
          type: "SET_TOAST_MESSAGE",
          payload: res.error.message,
        });
        dispatch({
          type: "SET_TOAST",
          payload: true,
        });
        setLoading(false);
        return;
      }
      dispatch({
        type: "SET_TOAST_TYPE",
        payload: "success",
      });
      dispatch({
        type: "SET_TOAST_MESSAGE",
        payload: "Check your email for a link to reset your password",
      });
      dispatch({
        type: "SET_TOAST",
        payload: true,
      });
      setLoading(false);
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
          <ResetForm
            loading={loading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
