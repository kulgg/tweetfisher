"use client";
import Tweet from "@/components/Tweet";
import {
  archivedTweetsAtom,
  twitterStatusQueueAtom,
  twitterTpsAtom,
} from "@/lib/atoms";
import { ITweetMap } from "@/lib/filter";
import useFetchQueue from "@/lib/hooks/use-fetch-queue";
import { DeletedTweet } from "@/lib/types";
import { useAtom } from "jotai";
import React, {
  Suspense,
  SuspenseList,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface TweetsProps {
  archiveMap: ITweetMap;
}

function Tweets() {
  const [archiveMap, setArchiveMap] = useAtom(archivedTweetsAtom);
  const [twitterStatusQueue, setTwitterStatusQueue] = useAtom(
    twitterStatusQueueAtom
  );
  const [requestsPerSecond, setRequestsPerSecond] = useAtom(twitterTpsAtom);
  const [deletedTweets, setDeletedTweets] = useState<DeletedTweet[]>([]);

  useFetchQueue({
    queue: twitterStatusQueue,
    setQueue: setTwitterStatusQueue,
    requestsPerSecond: requestsPerSecond,
    setRequestsPerSecond: setRequestsPerSecond,
    action: (response, invalidated, curr) => {
      console.log(response.status);
      if (response.status === 404) {
        setDeletedTweets((prev) => [...prev, curr[0]]);
      }
    },
    invalidateCanary: "",
    urlAccessor: (s) =>
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/${encodeURIComponent(
        s[0].url
      )}`,
  });

  return (
    <div>
      {deletedTweets.map((x) => (
        <div key={x.url}>{x.url}</div>
      ))}
    </div>
  );
}

export default Tweets;
