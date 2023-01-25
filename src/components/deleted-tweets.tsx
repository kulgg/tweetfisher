import React from "react";
import { FullDeletedTweet } from "../pages";
import ArchivedTweet from "./tweet";

function DeletedTweets({ tweets }: { tweets: FullDeletedTweet[] }) {
  return (
    <div className="my-10 mr-auto flex w-full flex-col gap-4">
      <div className="border-t border-gray-600"></div>
      {tweets.map((x) => (
        <ArchivedTweet
          key={x.tweet}
          text={x.tweet}
          username={x.username}
          created={x.date}
          pfp={x.pfp.replace("_bigger", "_400x400")}
          url={x.url}
          handle={x.handle}
        />
      ))}
    </div>
  );
}

export default DeletedTweets;
