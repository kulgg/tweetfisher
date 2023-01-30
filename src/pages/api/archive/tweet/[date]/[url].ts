import type { NextApiRequest, NextApiResponse } from "next";
import { fetchPlus } from "../../../../../utils/fetch";
import {
  formatTweetHtml,
  formatUsername,
} from "../../../../../utils/formatter";
import {
  getAvatarUrl,
  getContainerHtml,
  getDate,
  getTweetHtml,
  getUsername,
} from "../../../../../utils/parsers/first-parser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { date, url } = query;

  if (!date || !url) {
    return res.status(400).json("Bad request");
  }

  const webArchiveUrl = `https://web.archive.org/web/${date}/${url}`;
  const result = await fetchPlus(
    webArchiveUrl,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1; https://duckduckgo.com/duckduckbot)",
      },
    },
    5
  );

  if (result) {
    let text = await result.text();

    const containerHtml = getContainerHtml(text);
    if (!containerHtml) {
      console.log("EARLY EXIT - No Container Html Match", webArchiveUrl);
      return res.status(500).json("Server error");
    }

    let tweetHtml = getTweetHtml(containerHtml);
    if (!tweetHtml) {
      console.log("EARLY EXIT - No Tweet Html Match", webArchiveUrl);
      return res.status(500).json("Server error");
    }

    let username = getUsername(containerHtml);
    if (!username) {
      console.log("EARLY EXIT - No Username Match", webArchiveUrl);
      return res.status(500).json("Server error");
    }

    const date = getDate(containerHtml);
    if (!date) {
      console.log("EARLY EXIT - No date found", webArchiveUrl);
      return res.status(500).json("Server error");
    }

    const avatarUrl = getAvatarUrl(containerHtml);
    if (!avatarUrl) {
      console.log("EARLY EXIT - No Avatar URL found", webArchiveUrl);
      return res.status(500).json("Server error");
    }

    tweetHtml = formatTweetHtml(tweetHtml);
    username = formatUsername(username);

    return res
      .status(200)
      .json({
        tweet: tweetHtml,
        username: username,
        date: date,
        pfp: avatarUrl,
      });
  }

  return res.status(500).json("Server error");
}
