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

  // const url = `https://web.archive.org/web/timemap/json?url=twitter.com%2F${username}%2Fstatus&matchType=prefix&collapse=urlkey&output=json&fl=original%2Cmimetype%2Ctimestamp%2Cendtimestamp%2Cgroupcount%2Cuniqcount&filter=!statuscode%3A%5B45%5D..&limit=10000&_=1674482650246`;
  const webArchiveUrl = `https://web.archive.org/cdx/search/cdx?url=twitter.com/${username}/status&matchType=prefix&filter=statuscode:200&mimetype:text/html`;
  console.log("url", webArchiveUrl);
  const result = await fetch(webArchiveUrl, {
    mode: "no-cors",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1; https://duckduckgo.com/duckduckbot)",
    },
  });

  if (result) {
    const text = await result.text();
    const statusUrls = text.split("\n").map((line) => line.split(" ")[2]!);
    const uniqueStatusUrls = statusUrls.filter(
      (s, i, list) => list.indexOf(s) === i
    );
    return res.status(200).json({
      statusUrls: uniqueStatusUrls,
    });
  }

  return res.status(500).json("Server error");
}
