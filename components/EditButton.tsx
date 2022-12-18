import { useAppState } from "./ContextProvider.tsx";
import { EditIcon } from "./EditIcon.tsx";

export default function EditButton() {
  const { isLogo, isOpaque, padding, dispatch } = useAppState();
  return (
    <div data-dial-init class="relative group">
      <div
        id="speed-dial-menu-dropdown-alternative"
        class="absolute bottom-14 left-0 flex w-48 hidden flex-col justify-end py-1 mb-4 space-y-2 bg-white rounded-lg border border-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-600"
      >
        <ul class="text-sm text-gray-500 dark:text-gray-300">
          <li>
            <div class="flex items-center py-3 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white">
              <input
                id="logo-checkbox"
                type="checkbox"
                value=""
                checked={isLogo}
                onChange={() =>
                  dispatch({ type: "SET_LOGO", payload: !isLogo })}
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="logo-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Logo
              </label>
            </div>
          </li>
          <li>
            <div class="flex items-center py-3 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                checked={isOpaque}
                onChange={() =>
                  dispatch({ type: "SET_OPAQUE", payload: !isOpaque })}
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Opaque
              </label>
            </div>
          </li>
          <li>
            <div class="flex flex-col items-start py-3 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white">
              <label
                for="steps-range"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Padding: {padding}
              </label>
              <input
                id="steps-range"
                type="range"
                min="0"
                max="10"
                value={padding}
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                onInput={(e: any) => {
                  dispatch({
                    type: "SET_PADDING",
                    payload: e.target.value,
                  });
                }}
              />
            </div>
          </li>
        </ul>
      </div>
      <button
        type="button"
        data-dial-toggle="speed-dial-menu-dropdown-alternative"
        aria-controls="speed-dial-menu-dropdown-alternative"
        aria-expanded="false"
        class="flex justify-center items-center ml-auto w-14 h-14 text-white bg-blue-700 rounded-full hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800  hover:scale-105 "
      >
        <EditIcon />
        <span class="sr-only">Open actions menu</span>
      </button>
    </div>
  );
}
