import clsx from "clsx";
import { Gif } from "../lib/gif";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";

export const GifItem: React.FC<{
  gif: Gif;
  selected: boolean;
  handleSelect: (gif: Gif) => void;
  handleSetProfile: () => void;
}> = ({ gif, selected = false, handleSelect, handleSetProfile }) => {
  return (
    <div
      key={gif.id}
      className="group relative"
      onClick={() => handleSelect(gif)}
    >
      <div
        className={clsx(
          "min-h-80 aspect-auto w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-square group-hover:opacity-75 hover:cursor-pointer",
          selected &&
            "opacity-50 outline-dashed outline-indigo-500 rounded-br-none rounded-bl-none"
        )}
      >
        <img
          src={gif.images.preview_gif.url}
          alt={gif.alt_text}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      {selected && (
        <>
          <div className="absolute z-1 top-1/2 right-1/2 -mt-6 -mr-6">
            <CheckBadgeIcon className="h-12 w-12 text-indigo-500" />
          </div>
          <div className="absolute z-10 buttom-0 w-full">
            <button
              onClick={handleSetProfile}
              className="w-full inline-flex justify-center rounded-md rounded-tl-none rounded-tr-none bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Set Profile Pic
            </button>
          </div>
        </>
      )}
    </div>
  );
};
