import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { TweetObject } from "../../../../../types/TweetObject";
import { fetchPlus } from "../../../../../utils/fetch";
import firstParser from "../../../../../utils/parsers/first-parser";
import secondParser from "../../../../../utils/parsers/second-parser";

async function handleResponse(
  res: NextApiResponse,
  tweetObj: TweetObject,
  url: string
) {
  const missingFields: string[] = [];
  for (const key in tweetObj) {
    if (tweetObj[key as keyof TweetObject] === "") {
      missingFields.push(key);
    }
  }
  if (missingFields.length > 0) {
    const msg = `[${url}]\nArchive parsing error: ${missingFields.join(
      ", "
    )} could not be parsed\n\n`;
    fs.writeFile("parsing_fails.txt", msg, { flag: "a+" }, (err) => {});
    return res.status(500).json(msg);
  }
  return res.status(200).json(tweetObj);
}

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

    let containerHtml = firstParser.getContainerHtml(text);
    if (containerHtml !== "") {
      const tweetObj = firstParser.getTweetObj(containerHtml);
      return handleResponse(res, tweetObj, webArchiveUrl);
    }
    console.log("First Parser failed");

    containerHtml = secondParser.getContainerHtml(text);
    if (containerHtml !== "") {
      const tweetObj = secondParser.getTweetObj(containerHtml);
      return handleResponse(res, tweetObj, webArchiveUrl);
    }

    const msg = `[${webArchiveUrl}]\nAll parsers failed\n\n`;
    fs.writeFile("parsing_fails.txt", msg, { flag: "a+" }, (err) => {});
  }

  return res.status(500).json("Server error");
}
