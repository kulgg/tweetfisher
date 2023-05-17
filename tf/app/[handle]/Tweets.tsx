"use client";
import Tweet from "@/components/Tweet";
import { Skeleton } from "@/components/ui/skeleton";
import { DeletedTweet } from "@/lib/types";
import { ITweetMap } from "@/lib/utils";
import React, { Suspense, SuspenseList, useEffect, useState } from "react";
import SuspenseTweet from "./SuspenseTweet";

export interface TweetsProps {
  archiveMap: ITweetMap;
}

async function Tweets({ archiveMap }: TweetsProps) {
  const [archiveQueue, setArchiveQueue] = useState(archiveMap);
  const [deletedTweets, setDeletedTweets] = useState<DeletedTweet[]>([]);
  // just fetch all tweets in queue here

  // 1. Fetch Status in queue
  // 2. If deleted add to deleted tweets state

  useEffect(() => {
    let a: NodeJS.Timeout | null = null;
    if (Object.keys(archiveQueue).length > 0) {
      a = setTimeout(() => {
        const nextStatusId = Object.keys(archiveQueue)[0];
        const curr = archiveQueue[nextStatusId][0];

        fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/${encodeURIComponent(
            curr.url
          )}`
        ).then((response) => {
          const x = response.status;
          // if (x === 429 || x >= 500) {
          //   setMissedTweets((prev) => [...prev, curr]);
          //   return;
          // }
          if (x === 404) {
            setDeletedTweets((prev) => [...prev, curr]);
          }
          const newArchiveQueue: ITweetMap = {};
          for (const a of Object.keys(archiveQueue)) {
            if (a !== nextStatusId) {
              newArchiveQueue[a] = archiveQueue[a];
            }
          }
          setArchiveQueue(newArchiveQueue);
        });
      }, 3000);
    }

    return () => {
      if (a) clearTimeout(a);
    };
  }, [archiveQueue]);

  return (
    <div>
      {deletedTweets.map((x) => (
        <Tweet archive={x} key={x.url} />
      ))}
    </div>
  );
}

export default Tweets;
