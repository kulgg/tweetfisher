import cheerio from "cheerio";
import { TweetObject } from "../../types/TweetObject";
import { formatTweetHtml, formatUsername } from "../formatter";
// Past July 2022

export const DateRegex = /<span.+?>(\d{1,2}:\d{2}.+?)<\/span>/;

const getContainerHtml = (html: string): string => {
  const $ = cheerio.load(html);
  const tweetContainer = $('article[data-testid="tweet"] > ').last();
  return tweetContainer?.html() ?? "";
};

const getTweetHtml = (html: string): string => {
  const $ = cheerio.load(html);
  const tweetContent = $('div[data-testid="tweetText"]').first();
  return tweetContent?.text() ?? "";
};

const getUsername = (html: string): string => {
  const $ = cheerio.load(html);
  const userNameParts = $(
    'div[data-testid="User-Names"] > div > div > a > div > div > span'
  )
    .children()
    .map((i, elem) => {
      if (elem.type === "text") {
        return elem.data;
      }
      if (elem.type === "tag") {
        if (elem.name === "img") {
          return $(elem).attr("alt");
        }
        return $(elem).text();
      }
      return "";
    })
    .get();

  return userNameParts.join("");
};

const getDate = (html: string): string => {
  const $ = cheerio.load(html);
  const dateContainer = $("time").first();
  if (dateContainer && dateContainer.text() !== "") {
    return dateContainer.text();
  }

  let match = html.match(DateRegex);
  if (!match || match[1] === undefined) {
    return "";
  }
  return match[1];
};

const getAvatarUrl = (html: string): string => {
  const $ = cheerio.load(html);
  const avatarContainer = $('div[data-testid="Tweet-User-Avatar"] img').first();
  return avatarContainer.attr("src") ?? "";
};

const getReplyTo = (html: string): string | null => {
  const $ = cheerio.load(html);
  const replyToContext = $("div>div>div>a>span").first();
  if (
    replyToContext === undefined ||
    replyToContext.text() === "" ||
    !replyToContext.text().startsWith("@")
  ) {
    return null;
  }

  const replyToContainer = replyToContext.parent().parent().parent();

  return replyToContainer.text();
};

const getImageUrls = (html: string): string[] => {
  const $ = cheerio.load(html);
  const imageUrls = $('img[alt="Image"]')
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
