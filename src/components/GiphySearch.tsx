import { GifsResult } from "@giphy/js-fetch-api";
import { useQuery } from "@tanstack/react-query";
import { FormEventHandler, useCallback, useState } from "react";
import { Gif } from "../lib/gif";
import { SearchParams } from "../lib/search";
import { GifItem } from "./GifItem";
import { SearchForm } from "./SearchForm";
import { useUser } from "./UserContext";

const searchKey = "search";

export const GiphySearch: React.FC = () => {
  const { setProfilePic } = useUser();
  const [selectedGif, setSelectedGif] = useState<Gif>();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: "",
  });

  const query = useQuery<GifsResult, { error: { message: string } }>({
    queryKey: [searchKey, searchParams.search],
    queryFn: async () => {
      if (!searchParams.search) return { data: [] };
      const response = await fetch(
        "/api/v1/gifs/search?" +
          new URLSearchParams({
            search: encodeURIComponent(searchParams.search),
          })
      );
      const json = await response.json();
      if (response.status > 299) {
        throw json;
      }
      return json;
    },
  });

  const handleSubmitSearch = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const search = formData.get("search");

      setSearchParams((s) => ({
        ...s,
        search: search?.toString().trim() || "",
      }));
    },
    [setSearchParams]
  );

  const handleSubmitSelected = useCallback(() => {
    if (!selectedGif) return;
    setProfilePic(selectedGif);
    setSelectedGif(undefined);
  }, [setProfilePic, selectedGif, setSelectedGif]);

  return (
    <div>
      <SearchForm
        handleSubmit={handleSubmitSearch}
        handleKeyUp={(e) =>
          setSearchParams((s) => ({
            ...s,
            search: (e.target as HTMLInputElement).value.toString().trim() || "",
          }))
        }
      />
      <div>
        {query.error && (
          <div className="my-4 bg-red-300/50 border border-red-600 text-red-600 rounded-md text-2xl p-6">
            {query.error.error.message}
          </div>
        )}
        {query.data?.data && (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
            {query.data?.data?.map((gif) => (
              <GifItem
                key={gif.id}
                gif={gif}
                selected={selectedGif?.id === gif.id}
                handleSelect={(gif) => setSelectedGif(gif)}
                handleSetProfile={handleSubmitSelected}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
