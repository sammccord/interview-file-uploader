import { GifsResult, GiphyFetch } from "@giphy/js-fetch-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { SearchParams } from "../../../../lib/search";

const gf = new GiphyFetch(process.env.GIPHY_KEY!);

interface Request extends Omit<NextApiRequest, "query"> {
  query: SearchParams;
}

class APIError extends Error {
  code: number;
  constructor(message: string, code: number = 400) {
    super(message);
    this.code = code;
  }
}

export default async function handler(
  req: Request,
  res: NextApiResponse<GifsResult | { error: { message: string } }>
) {
  try {
    if (req.method !== "GET")
      throw new APIError("Invalid method supplied", 400);

    // Pass select query params to library method
    // TODO better validation, assume library or upstream api will validate as well
    const { search, limit, sort, offset, lang } = req.query;

    // validate parameters
    if (!search || !search.length || search.length < 3) {
      throw new APIError("Invalid search term");
    }

    const result = await gf.search(decodeURIComponent(search), {
      limit,
      sort,
      offset,
      lang,
    });
    res.status(200).json(result);
  } catch (e: any) {
    if (e instanceof APIError) {
      return res.status(e.code).json({ error: { message: e.message } });
    }
    res
      .status(400)
      .json({ error: { message: e.message || "An unknown error occured" } });
  }
}
