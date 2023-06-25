"use client";
import Tweet from "@/components/Tweet";
import { Skeleton } from "@/components/ui/skeleton";
import { DeletedTweet } from "@/lib/types";
import { ITweetMap } from "@/lib/utils";
import React, { Suspense, SuspenseList, useEffect, useState } from "react";
import SuspenseTweet from "./SuspenseTweet";
import useFetchQueue from "@/lib/hooks/use-fetch-queue";

export interface TweetsProps {
  uniqueArchivedTweets: DeletedTweet[][];
}

async function Tweets({ uniqueArchivedTweets }: TweetsProps) {
  const [archiveQueue, setArchiveQueue] = useState(
    uniqueArchivedTweets.map((x) => x[0])
  );
  const [deletedTweets, setDeletedTweets] = useState<DeletedTweet[]>([]);
  // just fetch all tweets in queue here

  // 1. Fetch Status in queue
  // 2. If deleted add to deleted tweets state

  // useFetchQueue({
  //   queue: archiveQueue,
  //   setQueue: setArchiveQueue,
  //   requestsPerSecond: 1,
  //   setRequestsPerSecond: () => {},
  //   action: (response, invalidated, curr) => {
  //     if (response.status === 404) {
  //       setDeletedTweets((prev) => [...prev, curr]);
  //     }
  //   },
  //   invalidateCanary: "",
  //   urlAccessor: (s) =>
  //     `${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/${encodeURIComponent(
  //       s.url
  //     )}`,
  // });

  // useEffect(() => {
  //   let a: NodeJS.Timeout | null = null;
  //   if (archiveQueue?.length > 0) {
  //     a = setTimeout(() => {
  //       const curr = archiveQueue[0][0];
  //       console.log("curr", curr);

  //       fetch(
  // `${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/${encodeURIComponent(
  //   curr.url
  // )}`;
  //       ).then((response) => {
  //         const x = response.status;
  //         console.log("response", x);
  //         // if (x === 429 || x >= 500) {
  //         //   setMissedTweets((prev) => [...prev, curr]);
  //         //   return;
  //         // }
  //         if (x === 404) {
  //           setDeletedTweets((prev) => [...prev, curr]);
  //         }
  //         setArchiveQueue((prev) => [
  //           ...prev.filter((x) => x[0].url !== curr.url),
  //         ]);
  //       });
  //     }, 3000);
  //   }

  //   return () => {
  //     if (a) clearTimeout(a);
  //   };
  // }, [archiveQueue]);

  return (
    <div>
      {deletedTweets.map((x) => (
        <Tweet archive={x} key={x.url} />
      ))}
    </div>
  );
}

export default Tweets;
