import fs from "fs";
import firstParser from "@/lib/parsers/first-parser";
import secondParser from "@/lib/parsers/second-parser";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = 5;

export type TweetObject = {
  tweet: string;
  username: string;
  date: string;
  avatarUrl: string;
  replyTo: string | null;
  imageUrls: string[];
};

async function handleResponse(tweetObj: TweetObject, url: string) {
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
    fs.writeFile("parsing_fails.txt", msg, { flag: "a+" }, (err: any) => {});
    return NextResponse.json(msg, { status: 500 });
  }
  return NextResponse.json(tweetObj, { status: 200 });
}

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { date: string; url: string };
  }
) {
  const { date, url } = params;
  if (!date || !url) {
    return NextResponse.json("Bad Request", { status: 400 });
  }

  const webArchiveUrl = `https://web.archive.org/web/${date}/${url}`;

  try {
    const res = await fetch(webArchiveUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1; https://duckduckgo.com/duckduckbot)",
      },
    });

    const contentType = res.headers.get("Content-Type");

    if (
      contentType &&
      (contentType as string).indexOf("application/json") !== -1
    ) {
      const json = await res.json();

      const tweetObj = {
        tweet: json.extended_tweet?.full_text ?? json.text,
        username: json.user.name,
        date: json.created_at,
        avatarUrl: json.user.profile_image_url_https,
        replyTo: `replying to @${json.in_reply_to_screen_name}`,
        imageUrls:
          json.entities?.media?.map((x: any) => x.media_url_https) ?? [],
      };
      return handleResponse(tweetObj, webArchiveUrl);
    } else {
      let text = await res.text();

      let containerHtml = firstParser.getContainerHtml(text);
      if (containerHtml !== "") {
        const tweetObj = firstParser.getTweetObj(containerHtml);
        return handleResponse(tweetObj, webArchiveUrl);
      }
      console.log("First Parser failed");

      containerHtml = secondParser.getContainerHtml(text);
      if (containerHtml !== "") {
        const tweetObj = secondParser.getTweetObj(containerHtml);
        return handleResponse(tweetObj, webArchiveUrl);
      }

      const msg = `[${webArchiveUrl}]\nAll parsers failed\n\n`;
      fs.writeFile("parsing_fails.txt", msg, { flag: "a+" }, (err) => {});
    }

    return NextResponse.json("yoyo", { status: 200 });
  } catch (err: any) {
    return NextResponse.json(err.response.statusText, {
      status: err.response.status,
    });
  }
}
