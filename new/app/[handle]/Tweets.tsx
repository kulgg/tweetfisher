"use client";
import Tweet from "@/components/Tweet";
import {
  archiveQueueAtom,
  archiveTpsAtom,
  archivedTweetsAtom,
  deletedTweetsAtom,
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

function Tweets({ handle }: { handle: string }) {
  const [archiveMap, setArchiveMap] = useAtom(archivedTweetsAtom);
  const [twitterStatusQueue, setTwitterStatusQueue] = useAtom(
    twitterStatusQueueAtom
  );
  const [twitterTps, setTwitterTps] = useAtom(twitterTpsAtom);
  const [archiveTps, setArchiveTps] = useAtom(archiveTpsAtom);
  const [archiveQueue, setArchiveQueue] = useAtom(archiveQueueAtom);
  const [results, setResults] = useAtom(deletedTweetsAtom);

  useFetchQueue({
    queue: twitterStatusQueue,
    setQueue: setTwitterStatusQueue,
    requestsPerSecond: twitterTps,
    setRequestsPerSecond: setTwitterTps,
    action: (response, invalidated, curr) => {
      console.log(response.status);
      if (response.status === 404) {
        setArchiveQueue((prev) => [...prev, curr[0]]);
      }
    },
    invalidateCanary: "",
    urlAccessor: (s) =>
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/${encodeURIComponent(
        s[0].url
      )}`,
  });

  useFetchQueue({
    queue: archiveQueue,
    setQueue: setArchiveQueue,
    requestsPerSecond: archiveTps,
    setRequestsPerSecond: setArchiveTps,
    action: (response, invalidated, curr) => {
      response
        .json()
        .then((x) =>
          setResults((prev) => [
            ...prev,
            { ...x, type: "result", handle: handle, url: curr.url },
          ])
        );
    },
    invalidateCanary: "",
    urlAccessor: (s) =>
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/archive/tweet/${
        s.archiveDate
      }/${encodeURIComponent(s.url)}`,
  });

  return (
    <div className="my-10 grid w-full grid-flow-dense grid-cols-1 items-center gap-4">
      {results.map((x, i) => (
        <Tweet t={x} key={i} />
      ))}
    </div>
  );
}

export default Tweets;
