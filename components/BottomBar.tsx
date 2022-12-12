type Props = {
  getImage: (type: string) => void;
  style: string;
  changeStyle: (style: string) => void;
  handleToast: () => void;
};
const STYLES = [
  "style-1",
  "bg-gradient-to-br from-purple-600 to-blue-500 ",
  "bg-gradient-to-r from-cyan-500 to-blue-500 ",
  "bg-gradient-to-r from-purple-500 to-pink-500 to-blue-600 ",
  "bg-gradient-to-br from-pink-500 to-orange-400 to-blue-600 ",
  "bg-gradient-to-r from-teal-200 to-lime-200 to-blue-600 ",
  "bg-gradient-to-r from-red-200 via-red-300 to-blue-600 ",
];
const RESOLUTIONS = [
  "460x460",
  "580x580",
  "700x700",
];
export default function BottomBar(
  { getImage, style, changeStyle, handleToast }: Props,
) {
  return (
    <div class="fixed bottom-10 left-0 right-0 mx-auto max-w-[330px] flex justify-center gap-5 w-full p-6 border rounded-lg shadow-md bg-gray-800 border-gray-700 ">
      <button
        data-popover-target="popover-no-arrow"
        type="button"
        class="flex justify-center items-center w-[52px] h-[52px] rounded-full border  border-gray-600 shadow-sm hover:text-white text-gray-400 bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-400"
      >
        <div
          class={"h-8 w-8 rounded-full " + style}
        />
      </button>
      <div
        data-popover
        id="popover-no-arrow"
        role="tooltip"
        class="absolute z-10 invisible inline-block w-60 text-sm font-light transition-opacity duration-300 border rounded-lg shadow-sm opacity-0 text-gray-400 border-gray-600 bg-gray-800"
      >
        <div class="px-3 py-2 border-b rounded-t-lg border-gray-600 bg-gray-700">
          <h3 class="font-semibold text-white">
            Select color
          </h3>
        </div>
        <div class="grid grid-cols-3 place-content-center px-3 py-2 w-full">
          {STYLES.map((style) => (
            <div
              class="p-2 w-full rounded hover:bg-gray-700 flex justify-center items-center cursor-pointer"
              onClick={() => changeStyle(style)}
            >
              <div
                class={"h-8 w-8 rounded-full " + style}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => getImage("save")}
        type="button"
        data-tooltip-target="tooltip-download"
        data-tooltip-placement="top"
        class="flex justify-center items-center w-[52px] h-[52px] rounded-full border  border-gray-600 shadow-sm hover:text-white text-gray-400 bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-400"
      >
        <svg
          aria-hidden="true"
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1.586l-.293-.293a.999.999 0 10-1.414 1.414l2 2a.999.999 0 001.414 0l2-2a.999.999 0 10-1.414-1.414l-.293.293V9z"
            fill-rule="evenodd"
          >
          </path>
        </svg>
        <span class="sr-only">Download</span>
      </button>
      <div
        id="tooltip-download"
        role="tooltip"
        class="inline-block absolute invisible z-10 py-2 px-3 w-auto text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
      >
        Download Image
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <button
        onClick={() => {
          getImage("copy");
          handleToast();
        }}
        type="button"
        data-tooltip-target="tooltip-copy"
        data-tooltip-placement="top"
        class="flex justify-center items-center w-[52px] h-[52px] rounded-full border  border-gray-600 shadow-sm hover:text-white text-gray-400 bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-400"
      >
        <svg
          aria-hidden="true"
          class="mx-auto mt-px w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z">
          </path>
          <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"></path>
        </svg>

        <span class="sr-only">Copy</span>
      </button>
      <div
        id="tooltip-copy"
        role="tooltip"
        class="inline-block absolute invisible z-10 py-2 px-3 w-auto text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
      >
        Copy Image to Clipboard
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div data-dial-init class="relative group">
        <div
          id="speed-dial-menu-dropdown-alternative"
          class="absolute bottom-14 left-0 flex w-48 hidden flex-col justify-end py-1 mb-4 space-y-2 bg-white rounded-lg border border-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-600"
        >
          <ul class="text-sm text-gray-500 dark:text-gray-300">
            {RESOLUTIONS.map((resolution) => (
              <li>
                <a
                  href="#"
                  class="flex items-center py-2 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
                >
                  <span class="text-sm font-medium">{resolution}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          data-dial-toggle="speed-dial-menu-dropdown-alternative"
          aria-controls="speed-dial-menu-dropdown-alternative"
          aria-expanded="false"
          class="flex justify-center items-center ml-auto w-14 h-14 text-white bg-blue-700 rounded-full hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            class="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
            </path>
          </svg>
          <span class="sr-only">Open actions menu</span>
        </button>
      </div>
    </div>
  );
}
