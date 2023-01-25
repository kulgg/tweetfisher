import { FullDeletedTweet } from "../pages";

function replaceNamedEntities(s: string) {
  s = s.replaceAll("&lt;", "<");
  s = s.replaceAll("&gt;", ">");
  s = s.replaceAll("&quot;", '"');
  s = s.replaceAll("&#39;", "'");
  s = s.replaceAll("&nbsp;", " ");
  return s;
}

const formatTextContent = (t: FullDeletedTweet): FullDeletedTweet => {
  const emojiRegex = /<img class="Emoji Emoji--forText".+?alt="(.+?)".+?>/gm;
  const handleRegex = /<a href=".+?<b>(.+?)<\/b><\/a>/gm;
  const linkRegex = /<a href=".+?>(.+?)<\/a>/gm;
  const emojiInUsernameRegex =
    /<span class="Emoji Emoji--forLinks.+?<span class="visuallyhidden".+?>(.+?)<\/span>/gm;
  t.tweet = t.tweet.replaceAll(emojiRegex, "$1");
  t.tweet = t.tweet.replaceAll(handleRegex, "@$1");
  t.tweet = t.tweet.replaceAll(linkRegex, " $1");
  t.tweet = replaceNamedEntities(t.tweet);
  t.username = t.username.replaceAll(emojiInUsernameRegex, "$1");
  t.username = replaceNamedEntities(t.username);
  return t;
};

export default formatTextContent;
