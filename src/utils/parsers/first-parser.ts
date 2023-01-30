import { text } from "stream/consumers";

// Seems to work up until July 2022

const TweetContainerRegex =
  /<div class="permalink-inner permalink-tweet-container([\s\S]*)/;
const TweetHtmlRegex =
  /<p class="TweetTextSize TweetTextSize--.+?>([\s\S]+?)<\/p>/;
const UsernameRegex = /<strong class="fullname.*?>([\s\S]+?)<\/strong>/;
const DateRegex = /<span class="metadata">[\s\S]+?<span>([\s\S]+?)<\/span>/;
const AvatarRegex = /<img class="avatar js-action-profile-avatar" src="(.+?)"/;

const getContainerHtml = (html: string): string => {
  let match = html.match(TweetContainerRegex);
  if (!match || match[1] === undefined) {
    return "";
  }
  return match[1];
};

const getTweetHtml = (html: string): string => {
  let match = html.match(TweetHtmlRegex);
  if (!match || match[1] === undefined) {
    return "";
  }
  return match[1];
};

const getUsername = (html: string): string => {
  let match = html.match(UsernameRegex);
  if (!match || match[1] === undefined) {
    return "";
  }
  return match[1];
};

const getDate = (html: string): string => {
  let match = html.match(DateRegex);
  if (!match || match[1] === undefined) {
    return "";
  }
  return match[1];
};

const getAvatarUrl = (html: string): string => {
  let match = html.match(AvatarRegex);
  if (!match || match[1] === undefined) {
    return "";
  }
  return match[1];
};

export { getContainerHtml, getTweetHtml, getUsername, getDate, getAvatarUrl };
