import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { FormEventHandler } from "react";

export const SearchForm: React.FC<{
  handleSubmit: FormEventHandler<HTMLFormElement>;
}> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-1 space-x-2 my-4">
      <div className="flex-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900 sr-only"
        >
          Search Giphy
        </label>
        <div>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              minLength={2}
              max={50}
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search Term"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Search
      </button>
    </form>
  );
};
