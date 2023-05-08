import { SearchOptions } from "@giphy/js-fetch-api";

export interface SearchParams extends SearchOptions {
  search: string;
}
