import { useAppState } from "./ContextProvider.tsx";

type Props = {};
const STYLES = [
  "style-1",
  "bg-gradient-to-br from-purple-600 to-blue-500 ",
  "bg-gradient-to-r from-cyan-500 to-blue-500 ",
  "bg-gradient-to-r from-purple-500 to-pink-500 to-blue-600 ",
  "bg-gradient-to-br from-pink-500 to-orange-400 to-blue-600 ",
  "bg-gradient-to-r from-teal-200 to-lime-200 to-blue-600 ",
  "bg-gradient-to-r from-red-200 via-red-300 to-blue-600 ",
];

export default function BgColorButton({}: Props) {
  const { selectedStyle, dispatch } = useAppState();
  return (
    <>
      <button
        data-popover-target="popover-no-arrow"
        type="button"
        class="flex justify-center items-center w-[52px] h-[52px] rounded-full border  border-gray-600 shadow-sm hover:text-white text-gray-400 bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-400  hover:scale-105 "
      >
        <div
          class={"h-8 w-8 rounded-full " + selectedStyle}
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
              onClick={() => dispatch({ type: "SET_STYLE", payload: style })}
            >
              <div
                class={"h-8 w-8 rounded-full " + style}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
