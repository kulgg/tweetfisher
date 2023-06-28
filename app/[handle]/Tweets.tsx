"use client";
import Tweet from "@/components/Tweet";
import {
  archiveQueueAtom,
  archivedTweetsAtom,
  deletedTweetsAtom,
  missedTweetsAtom,
  numStatusResponsesAtom,
  twitterStatusQueueAtom,
  settingsAtom,
  isAutoScrollAtom,
  accountNameAtom,
} from "@/lib/atoms";
import { ITweetMap } from "@/lib/filter";
import useFetchQueue from "@/lib/hooks/use-fetch-queue";
import { DeletedTweet } from "@/lib/types";
import { useAtom, useAtomValue } from "jotai";
import React, {
  Suspense,
  SuspenseList,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function Tweets({ handle }: { handle: string }) {
  const bottomElementRef = useRef<HTMLDivElement>(null);
  const isAutoScroll = useAtomValue(isAutoScrollAtom);
  const accountName = useAtomValue(accountNameAtom);

  const [archiveMap, setArchiveMap] = useAtom(archivedTweetsAtom);
  const [twitterStatusQueue, setTwitterStatusQueue] = useAtom(
    twitterStatusQueueAtom
  );
  const [settings, setSettings] = useAtom(settingsAtom);
  const [archiveQueue, setArchiveQueue] = useAtom(archiveQueueAtom);
  const [missedTweets, setMissedTweets] = useAtom(missedTweetsAtom);
  const [numStatusResponses, setNumStatusResponses] = useAtom(
    numStatusResponsesAtom
  );
  const [results, setResults] = useAtom(deletedTweetsAtom);

  useFetchQueue({
    queue: twitterStatusQueue,
    setQueue: setTwitterStatusQueue,
    requestsPerSecond: settings.tps_settings.twitter,
    action: (response, invalidated, curr) => {
      if (invalidated) {
        console.log("Invalidated status response");
        return;
      }

      if (response.status === 429 || response.status >= 500) {
        setMissedTweets((prev) => [...prev, curr[0]]);
      }

      setNumStatusResponses((prev) => prev + 1);

      if (response.status === 404) {
        setArchiveQueue((prev) => [...prev, curr[0]]);
      }
    },
    invalidateCanary: handle,
    urlAccessor: (s) =>
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/${encodeURIComponent(
        s[0].url
      )}`,
  });

  useFetchQueue({
    queue: archiveQueue,
    setQueue: setArchiveQueue,
    requestsPerSecond: settings.tps_settings.archive,
    priorAction: (curr) =>
      setResults((x) => [...x, { type: "loading", statusId: curr.statusId }]),
    action: (response, invalidated, curr) => {
      if (invalidated) {
        console.log("Invalidated archive response");
        return;
      }

      response.json().then((x) =>
        setResults((prev) =>
          prev.map((y) => {
            if (y.type === "loading" && y.statusId === curr.statusId) {
              return {
                ...x,
                type: "result",
                handle: handle,
                url: `https://web.archive.org/web/${curr.archiveDate}/${curr.url}`,
              };
            }

            return y;
          })
        )
      );
    },
    invalidateCanary: handle,
    urlAccessor: (s) =>
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/archive/tweet/${
        s.archiveDate
      }/${encodeURIComponent(s.url)}`,
  });

  useEffect(() => {
    if (isAutoScroll && results.length > 0 && accountName === handle) {
      bottomElementRef.current?.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
        block: "center",
      });
    }
  }, [results, isAutoScroll, accountName, handle]);

  return (
    <div>
      <div className="my-10 grid w-full grid-flow-dense grid-cols-1 items-center gap-4">
        {results.map((x, i, arr) => {
          if (i === arr.length - 1)
            return (
              <div ref={bottomElementRef} key={i}>
                <Tweet t={x} />
              </div>
            );
          return <Tweet t={x} key={i} />;
        })}
      </div>
    </div>
  );
}

export default Tweets;
