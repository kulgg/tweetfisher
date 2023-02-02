import React from "react";
import { FullDeletedTweet } from "../pages";
import ArchivedTweet from "./tweet";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function DeletedTweets({
  tweets,
}: {
  tweets: FullDeletedTweet[];
}) {
  const [tweetsContainer] = useAutoAnimate<HTMLDivElement>({ duration: 300 });

  return (
    <div
      className="my-10 grid w-full grid-flow-dense grid-cols-1 items-center gap-4"
      ref={tweetsContainer}
    >
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
