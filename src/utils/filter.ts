import { DeletedTweet } from "../pages";

const TWEET_URL_REGEX = /twitter.com\/[\w]{1,15}\/status\/[0-9]{19}\/?$/;

const validUrlsFilter = (t: DeletedTweet) => isValidTweetStatusUrl(t.url);

const seenUrls = new Set<string>();

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

export { validUrlsFilter, duplicateUrlsFilter };
