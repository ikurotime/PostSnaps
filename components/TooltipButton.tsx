import { ComponentChild } from "preact";

type Props = {
  Icon: ComponentChild;
  onClick: () => void;
  tooltipId: string;
  tooltipLabel: string;
};

export default function TooltipButton(
  { Icon, onClick, tooltipId, tooltipLabel }: Props,
) {
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        data-tooltip-target={tooltipId}
        data-tooltip-placement="top"
        class="flex justify-center items-center group w-[52px] h-[52px] rounded-full border  border-gray-600 shadow-sm hover:text-white text-gray-400 bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-400  hover:scale-105 "
      >
        {Icon}
        <span class="sr-only">{tooltipLabel}</span>
      </button>
      <div
        id={tooltipId}
        role="tooltip"
        class="inline-block absolute invisible z-10 py-2 px-3 w-auto text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip "
      >
        {tooltipLabel}
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </>
  );
}
