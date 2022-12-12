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
export default function BottomBar(
  { getImage, style, changeStyle, handleToast }: Props,
) {
  return (
    <a
      href="#"
      class="flex justify-center gap-5 w-full p-6 border rounded-lg shadow-md bg-gray-800 border-gray-700 hover:bg-gray-700"
    >
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
    </a>
  );
}
