import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DeletedTweet } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms));

const TWEET_URL_REGEX =
  /^https?:\/\/(www\.)?twitter\.com\/[\w]{1,15}\/status\/([0-9]{19})\/?$/;

export const validUrlsFilter = (t: DeletedTweet) =>
  isValidTweetStatusUrl(t.url);

function isValidTweetStatusUrl(url: string): boolean {
  return url.match(TWEET_URL_REGEX) !== null;
}

export interface ITweetMap {
  [id: string]: DeletedTweet[];
}

export const groupByUrl = (dict: ITweetMap, t: DeletedTweet) => {
  const match = t.url.match(TWEET_URL_REGEX);
  if (!match || !match[2]) {
    throw new Error(`Invalid tweet url: ${t.url}`);
  }
  const statusId = match[2];
  dict[statusId] = (dict[statusId] || []).concat(t);
  return dict;
};
