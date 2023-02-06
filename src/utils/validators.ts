const TWEET_URL_REGEX = /twitter.com\/[\w]{1,15}\/status\/[0-9]{19}\/?$/;

export default function isValidTweetStatusUrl(url: string): boolean {
  return url.match(TWEET_URL_REGEX) !== null;
}
