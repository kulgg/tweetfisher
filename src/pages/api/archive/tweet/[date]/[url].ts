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
    let text = await result.text();

    let regex =
      /<div class="permalink-inner permalink-tweet-container([\s\S]*)/;
    let match = text.match(regex);
    if (!match || match[1] === undefined) {
      return res.status(500).json("Server error");
    }
    text = match[1];

    regex =
      /<p class="TweetTextSize TweetTextSize--jumbo js-tweet-text tweet-text" lang="en" data-aria-label-part="0">(.+?)<\/p>/;
    match = text.match(regex);
    if (!match) {
      return res.status(500).json("Server error");
    }
    const tweet = match[1];
    console.log("tweet", tweet);

    regex = /<strong class="fullname.*?>(.+?)<\/strong>/;
    match = text.match(regex);
    if (!match) {
      return res.status(500).json("Server error");
    }
    const username = match[1];
    console.log("username", username);

    regex = /<span>(\d{1,2}:\d{2} [A|P]M.*?\d{4})<\/span>/;
    match = text.match(regex);
    if (!match) {
      return res.status(500).json("Server error");
    }
    const date = match[1];
    console.log("date", date);

    regex = /<img class="avatar js-action-profile-avatar" src="(.+?)"/;
    match = text.match(regex);
    if (!match) {
      return res.status(500).json("Server error");
    }
    const imgUrl = match[1];
    console.log("imgUrl", imgUrl);

    return res
      .status(200)
      .json({ tweet: tweet, username: username, date: date, pfp: imgUrl });
  }

  return res.status(500).json("Server error");
}
