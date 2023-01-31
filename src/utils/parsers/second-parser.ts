import cheerio from "cheerio";
import { TweetObject } from "../../types/TweetObject";
import { formatTweetHtml, formatUsername } from "../formatter";
// Past July 2022

export const DateRegex = /<span.+?>(\d{1,2}:\d{2}.+?)<\/span>/gm;

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
  const usernameContainer = $(
    'div[data-testid="User-Names"] > div > div'
  ).first();
  return usernameContainer?.text() ?? "";
};

const getDate = (html: string): string => {
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

const getTweetObj = (containerHtml: string): TweetObject => {
  let tweetHtml = getTweetHtml(containerHtml);
  let username = getUsername(containerHtml);
  const date = getDate(containerHtml);
  const avatarUrl = getAvatarUrl(containerHtml);

  tweetHtml = formatTweetHtml(tweetHtml);
  username = formatUsername(username);

  return {
    tweet: tweetHtml,
    username: username,
    date: date,
    avatarUrl: avatarUrl,
  };
};

export default {
  getContainerHtml,
  getTweetObj,
};
