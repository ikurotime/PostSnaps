import { useAppState } from "../components/ContextProvider.tsx";

export default function Toast() {
  const { isToastShown, toast_message, toast_type } = useAppState();
  return (
    <div
      id="toast-success"
      class={`fixed right-5 top-5 z-20 flex items-center p-4 mb-4 w-full max-w-xs bg-white rounded-lg shadow text-gray-400 ${
        toast_type === "success" ? "bg-green-700" : "bg-red-500"
      } transition-opacity ` +
        (isToastShown ? "visible" : "invisible")}
      role="alert"
    >
      <div
        class={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg ${
          toast_type === "success" ? "bg-green-800" : "bg-red-800"
        } text-white`}
      >
        {toast_type === "success" ? <CheckIcon /> : <ErrorIcon />}
        <span class="sr-only">Check icon</span>
      </div>
      <div class="ml-3 text-sm font-normal text-white">{toast_message}</div>
    </div>
  );
}

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    class="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clip-rule="evenodd"
    >
    </path>
  </svg>
);
const ErrorIcon = () => (
  <svg
    aria-hidden="true"
    class="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clip-rule="evenodd"
    >
    </path>
  </svg>
);
