const replaceNamedEntities = (s: string): string => {
  s = s.replaceAll("&lt;", "<");
  s = s.replaceAll("&gt;", ">");
  s = s.replaceAll("&quot;", '"');
  s = s.replaceAll("&#39;", "'");
  s = s.replaceAll("&nbsp;", " ");
  return s;
};

const emojiInUsernameRegex =
  /<span class="Emoji Emoji--forLinks.+?<span class="visuallyhidden".+?>(.+?)<\/span>/gm;
const emojiRegex = /<img class="Emoji Emoji--forText".+?alt="(.+?)".+?>/gm;
const handleRegex = /<a href=".+?<b>(.+?)<\/b><\/a>/gm;
const linkRegex = /<a href=".+?>(.+?)<\/a>/gm;
const spanLinkRegex =
  /<span class="tco-ellipsis"><\/span><span class="invisible">https:\/\/<\/span><span.+?>(.+?)<\/span><span class="invisible">(.+?)<\/span>.+?<\/span>.+?<\/span>/gm;

const formatTweetHtml = (tweetHtml: string): string => {
  tweetHtml = tweetHtml.replaceAll(emojiRegex, "$1");
  tweetHtml = tweetHtml.replaceAll(handleRegex, "@$1");
  tweetHtml = tweetHtml.replaceAll(linkRegex, " $1");
  tweetHtml = tweetHtml.replaceAll(spanLinkRegex, "$1$2");
  tweetHtml = replaceNamedEntities(tweetHtml);
  return tweetHtml;
};

const formatUsername = (u: string): string => {
  u = u.replaceAll(emojiInUsernameRegex, "$1");
  u = replaceNamedEntities(u);
  return u;
};

export { formatTweetHtml, formatUsername, replaceNamedEntities };
