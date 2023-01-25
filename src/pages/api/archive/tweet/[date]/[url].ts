import type { NextApiRequest, NextApiResponse } from "next";

const fetchPlus = async (
  url: string,
  options = {},
  retries: number
): Promise<Response | null> => {
  try {
    const result = await fetch(url, options);
    if (result === null || !result.ok) {
      if (retries > 0) {
        console.log("retries", retries);
        await new Promise((resolve) => setTimeout(resolve, 500));
        return await fetchPlus(url, options, retries - 1);
      }
    }
    return result;
  } catch (error) {
    if (retries > 0) {
      console.log("retries", retries);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await fetchPlus(url, options, retries - 1);
    }
  }
  return null;
};

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

    let regex =
      /<div class="permalink-inner permalink-tweet-container([\s\S]*)/;
    let match = text.match(regex);
    if (!match || match[1] === undefined) {
      console.log("EARLY EXIT - No Text Match", webArchiveUrl);
      return res.status(500).json("Server error");
    }
    text = match[1];

    let tweet = "";
    let username = "";
    let date = "";
    let imgUrl = "";

    console.log("search", text.search('class="TweetTextSize TweetTextSize--'));
    regex = /<p class="TweetTextSize TweetTextSize--.+?>([\s\S]+?)<\/p>/;
    match = text.match(regex);
    if (!match || !match[1]) {
      console.log("EARLY EXIT - No Tweet Match", webArchiveUrl);
      return res.status(500).json("Server error");
    }
    tweet = match[1];
    console.log("tweet", tweet);

    regex = /<strong class="fullname.*?>([\s\S]+?)<\/strong>/;
    match = text.match(regex);
    if (!match || !match[1]) {
      console.log("EARLY EXIT - No Username Match", webArchiveUrl);
      return res.status(500).json("Server error");
    }
    username = match[1];
    console.log("username", username);

    regex = /<span>(\d{1,2}:\d{2} [A|P]M.*?\d{4})<\/span>/;
    match = text.match(regex);
    if (!match || !match[1]) {
      console.log("EARLY EXIT - No Date Match", webArchiveUrl);
      return res.status(500).json("Server error");
    }
    date = match[1];
    console.log("date", date);

    regex = /<img class="avatar js-action-profile-avatar" src="(.+?)"/;
    match = text.match(regex);
    if (!match || !match[1]) {
      console.log("EARLY EXIT - No avatar Match", webArchiveUrl);
      return res.status(500).json("Server error");
    }
    imgUrl = match[1];
    console.log("imgUrl", imgUrl);

    return res
      .status(200)
      .json({ tweet: tweet, username: username, date: date, pfp: imgUrl });
  }

  return res.status(500).json("Server error");
}
