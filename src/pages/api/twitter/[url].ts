import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { url } = query;

  if (!url || Array.isArray(url)) {
    return res.status(400).json("No url");
  }

  if (!url.startsWith("https://twitter.com/")) {
    return res.status(400).json("Bad URL");
  }

  console.log("url", url);

  const result = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1; https://duckduckgo.com/duckduckbot)",
    },
    method: "HEAD",
  });

  if (!result) {
    return res.status(500).json("Server error");
  }

  if (result.status === 404) {
    return res.status(404).json("Does not exist");
  }

  return res.status(200).json("Exists");
}
