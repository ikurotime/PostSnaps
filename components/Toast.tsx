import { useAppState } from "../components/ContextProvider.tsx";

type Props = {
  text: string;
};

export default function Toast({ text }: Props) {
  const { isToastShown } = useAppState();
  return (
    <div
      id="toast-success"
      class={"fixed right-5 top-5 z-20 flex items-center p-4 mb-4 w-full max-w-xs bg-white rounded-lg shadow text-gray-400 bg-green-700 transition-all " +
        (isToastShown ? "visible" : "invisible")}
      role="alert"
    >
      <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg bg-green-800 text-white">
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
        <span class="sr-only">Check icon</span>
      </div>
      <div class="ml-3 text-sm font-normal text-white">{text}</div>
    </div>
  );
}
