import { DeletedTweet } from "./types";

const TWEET_URL_REGEX =
  /^https?:\/\/(www\.)?twitter\.com\/[\w]{1,15}\/status\/([0-9]{19})\/?$/;

const validUrlsFilter = (t: DeletedTweet) => isValidTweetStatusUrl(t.url);

const seenUrls = new Set<string>();

export interface ITweetMap {
  [id: string]: DeletedTweet[];
}

const groupByUrl = (dict: ITweetMap, t: DeletedTweet) => {
  const match = t.url.match(TWEET_URL_REGEX);
  if (!match || !match[2]) {
    throw new Error(`Invalid tweet url: ${t.url}`);
  }
  const statusId = match[2];
  dict[statusId] = (dict[statusId] || []).concat(t);
  return dict;
};

const duplicateUrlsFilter = (t: DeletedTweet) => {
  if (seenUrls.has(t.url)) {
    return false;
  }
  seenUrls.add(t.url);
  return true;
};

function isValidTweetStatusUrl(url: string): boolean {
  return url.match(TWEET_URL_REGEX) !== null;
}

export { validUrlsFilter, duplicateUrlsFilter, groupByUrl };
