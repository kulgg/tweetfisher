import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { handle } = query;

  const result = await fetch(`https://twitter.com/${handle}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1; https://duckduckgo.com/duckduckbot)",
    },
  });

  if (!result) {
    return res.status(500).json("Server error");
  }

  const html = await result.text();

  if (result.status === 404) {
    return res.status(200).json({ accountType: "notfound" });
  }

  if (html.search(/Account suspended<\/span>/) !== -1) {
    return res.status(200).json({ accountType: "suspended" });
  }

  return res.status(200).json({ accountType: "active" });
}
