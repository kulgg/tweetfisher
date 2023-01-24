import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { date, url } = query;
  console.log("date", date);
  console.log("url", url);

  if (!date || !url) {
    return res.status(400).json("Bad request");
  }

  const webArchiveUrl = `https://web.archive.org/web/${date}/${url}`;
  console.log("url", webArchiveUrl);
  const result = await fetch(webArchiveUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1; https://duckduckgo.com/duckduckbot)",
    },
  });

  if (result) {
    const text = await result.text();
    const statusUrls = text
      .split("\n")
      .map((line) => line.split(" ")[2])
      .filter((x) => x);
    const uniqueStatusUrls = statusUrls.filter(
      (s, i, list) => list.indexOf(s) === i
    );
    return res.status(200).json({
      statusUrls: uniqueStatusUrls,
    });
  }

  return res.status(500).json("Server error");
}
