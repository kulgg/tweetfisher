"use client";

import { archivedTweetsAtom, twitterStatusQueueAtom } from "@/lib/atoms";
import { ITweetMap, groupByUrl, validUrlsFilter } from "@/lib/filter";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import Tweets from "./Tweets";
import { DeletedTweet } from "@/lib/types";

function getUnique(data: any) {
  return data.filter(validUrlsFilter).reduce(groupByUrl, {});
}

function FetchTweets({ handle }: { handle: string }) {
  const setArchivedTweets = useSetAtom(archivedTweetsAtom);
  const setTwitterStatusQueue = useSetAtom(twitterStatusQueueAtom);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/archive/tweets/${handle}`;
    console.log(url);
    fetch(url)
      .then((x) => x.json())
      .then((x) => {
        const tweetToArchivesMap: ITweetMap = getUnique(x);
        setArchivedTweets(tweetToArchivesMap);

        const tmp: DeletedTweet[][] = [];
        for (const k of Object.keys(tweetToArchivesMap)) {
          tmp.push(tweetToArchivesMap[k].map((x) => ({ ...x, statusId: k })));
        }

        setTwitterStatusQueue(tmp);
      });
  }, []);

  return (
    <div>
      <Tweets handle={handle} />
    </div>
  );
}

export default FetchTweets;
