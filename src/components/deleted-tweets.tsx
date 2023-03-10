import { FullDeletedTweet } from "../pages";
import ArchivedTweet from "./tweet";

export default function DeletedTweets({
  tweets,
}: {
  tweets: FullDeletedTweet[];
}) {
  return (
    <div className="my-10 grid w-full grid-flow-dense grid-cols-1 items-center gap-4">
      {tweets.map((x) => (
        <ArchivedTweet
          key={x.url}
          text={x.tweet}
          username={x.username}
          created={x.date}
          pfp={x.avatarUrl}
          url={x.url}
          handle={x.handle}
          replyTo={x.replyTo}
          imageUrls={x.imageUrls}
        />
      ))}
    </div>
  );
}
