import { DeletedTweet } from "../pages";

const TWEET_URL_REGEX = /twitter.com\/[\w]{1,15}\/status\/[0-9]{19}\/?$/;

const validUrlsFilter = (t: DeletedTweet) => isValidTweetStatusUrl(t.url);

const duplicateUrlsFilter = (t: DeletedTweet, i: number, a: DeletedTweet[]) =>
  a.findIndex((x) => x.url === t.url) === i;

function isValidTweetStatusUrl(url: string): boolean {
  return url.match(TWEET_URL_REGEX) !== null;
}

export { validUrlsFilter, duplicateUrlsFilter };
