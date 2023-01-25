import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { username } = query;

  if (!username) {
    return res.status(400).json("No username");
  }

  const webArchiveUrl = `https://web.archive.org/cdx/search/cdx?url=twitter.com/${username}/status&matchType=prefix&filter=statuscode:200&mimetype:text/html`;
  console.log("url", webArchiveUrl);
  const result = await fetch(webArchiveUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1; https://duckduckgo.com/duckduckbot)",
    },
  });

  if (result) {
    const text = await result.text();
    const lines = text.split("\n");

    const data = lines
      .map((line) => line.split(" "))
      .map((x) => ({ archiveDate: x[1]!, url: x[2]! }))
      .filter((x) => x.archiveDate !== undefined && x.url !== undefined);

    return res.status(200).json(data);
  }

  return res.status(500).json("Server error");
}
