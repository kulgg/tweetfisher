import cheerio from "cheerio";
import { TweetObject } from "../../types/TweetObject";
import { formatTweetHtml, formatUsername } from "../formatter";

// Seems to work up until July 2022

// const TweetContainerRegex =
//   /<div class="permalink-inner permalink-tweet-container([\s\S]*)/;
// const TweetHtmlRegex =
//   /<p class="TweetTextSize TweetTextSize--.+?>([\s\S]+?)<\/p>/;
// const UsernameRegex = /<strong class="fullname.*?>([\s\S]+?)<\/strong>/;
// const AvatarRegex = /<img class="avatar js-action-profile-avatar" src="(.+?)"/;

const getContainerHtml = (html: string): string => {
  const $ = cheerio.load(html);
  const tweetContainer = $(
    "div.permalink-inner.permalink-tweet-container"
  ).last();
  return tweetContainer?.html() ?? "";

  // let match = html.match(TweetContainerRegex);
  // if (!match || match[1] === undefined) {
  //   return "";
  // }
  // return match[1];
};

const getTweetHtml = (html: string): string => {
  const $ = cheerio.load(html);
  const tweetContent = $("p.TweetTextSize").first();
  return tweetContent?.text() ?? "";
  // let match = html.match(TweetHtmlRegex);
  // if (!match || match[1] === undefined) {
  //   return "";
  // }
  // return match[1];
};

const getUsername = (html: string): string => {
  const $ = cheerio.load(html);
  const tweetContent = $("strong.fullname").first();
  return tweetContent?.text() ?? "";
  // let match = html.match(UsernameRegex);
  // if (!match || match[1] === undefined) {
  //   return "";
  // }
  // return match[1];
};

const getDate = (html: string): string => {
  const $ = cheerio.load(html);
  const tweetContent = $("span.metadata > span").first();
  return tweetContent?.text() ?? "";
  // let match = html.match(DateRegex);
  // if (!match || match[1] === undefined) {
  //   return "";
  // }
  // return match[1];
};

const getAvatarUrl = (html: string): string => {
  const $ = cheerio.load(html);
  const avatarContainer = $("img.avatar").first();
  return avatarContainer.attr("src") ?? "";
  // let match = html.match(AvatarRegex);
  // if (!match || match[1] === undefined) {
  //   return "";
  // }
  // return match[1];
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
