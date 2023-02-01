import cheerio from "cheerio";
import { TweetObject } from "../../types/TweetObject";
import { formatTweetHtml, formatUsername } from "../formatter";

// Seems to work up until July 2022

const getContainerHtml = (html: string): string => {
  const $ = cheerio.load(html);
  const tweetContainer = $(
    "div.permalink-inner.permalink-tweet-container"
  ).last();
  return tweetContainer?.html() ?? "";
};

const getTweetHtml = (html: string): string => {
  const $ = cheerio.load(html);
  const tweetContent = $("p.TweetTextSize")
    .first()
    .contents()
    .map((i, elem) => {
      if (elem.type === "text") {
        return elem.data;
      }
      if (elem.type === "tag") {
        if ($(elem).hasClass("Emoji") && $(elem).attr("alt") !== undefined) {
          return $(elem).attr("alt");
        }
        return $(elem).text();
      }
      return "";
    })
    .get();

  return tweetContent.join("");
};

const getUsername = (html: string): string => {
  const $ = cheerio.load(html);
  const tweetContent = $("strong.fullname").first();
  return tweetContent?.text() ?? "";
};

const getDate = (html: string): string => {
  const $ = cheerio.load(html);
  const tweetContent = $("span.metadata > span").first();
  return tweetContent?.text() ?? "";
};

const getAvatarUrl = (html: string): string => {
  const $ = cheerio.load(html);
  const avatarContainer = $("img.avatar").first();
  return avatarContainer.attr("src") ?? "";
};

const getReplyTo = (html: string): string | null => {
  const $ = cheerio.load(html);
  const replyToContext = $("div.ReplyingToContextBelowAuthor").first();
  if (replyToContext === undefined || replyToContext.text() === "") {
    return null;
  }
  return replyToContext.text().trim();
};

const getImageUrls = (html: string): string[] => {
  const $ = cheerio.load(html);
  const imageUrls = $("div.AdaptiveMediaOuterContainer")
    .find("img")
    .map((i, elem) => {
      return $(elem).attr("src");
    })
    .get();

  return imageUrls;
};

const getTweetObj = (containerHtml: string): TweetObject => {
  let tweetHtml = getTweetHtml(containerHtml);
  let username = getUsername(containerHtml);
  const date = getDate(containerHtml);
  const avatarUrl = getAvatarUrl(containerHtml);
  const replyTo = getReplyTo(containerHtml);
  const imageUrls = getImageUrls(containerHtml);

  tweetHtml = formatTweetHtml(tweetHtml);
  username = formatUsername(username);

  return {
    tweet: tweetHtml,
    username: username,
    date: date,
    avatarUrl: avatarUrl,
    replyTo: replyTo,
    imageUrls: imageUrls,
  };
};

export default {
  getContainerHtml,
  getTweetObj,
};
