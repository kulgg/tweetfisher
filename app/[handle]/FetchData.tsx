"use client";

import {
  accountNameAtom,
  accountStatusAtom,
  archiveQueueAtom,
  archivedTweetsAtom,
  deletedTweetsAtom,
  missedTweetsAtom,
  numStatusResponsesAtom,
  twitterStatusQueueAtom,
} from "@/lib/atoms";
import { ITweetMap, getUnique } from "@/lib/filter";
import { DeletedTweet } from "@/lib/types";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import Tweets from "./Tweets";

function FetchData({ handle }: { handle: string }) {
  const [accountStatus, setAccountStatus] = useAtom(accountStatusAtom);
  const [accountName, setAccountName] = useAtom(accountNameAtom);
  const [archivedTweets, setArchivedTweets] = useAtom(archivedTweetsAtom);
  const setTwitterStatusQueue = useSetAtom(twitterStatusQueueAtom);
  const setArchiveQueue = useSetAtom(archiveQueueAtom);
  const setDeletedTweets = useSetAtom(deletedTweetsAtom);
  const setNumStatusResponses = useSetAtom(numStatusResponsesAtom);
  const setMissedTweets = useSetAtom(missedTweetsAtom);

  useEffect(() => {
    console.log("Initial useEffect");
    if (accountName != handle) {
      setAccountName(handle);
      setAccountStatus("");
      setNumStatusResponses(0);
      setArchivedTweets({});
      setTwitterStatusQueue([]);
      setArchiveQueue([]);
      setMissedTweets([]);
      setDeletedTweets([]);
    }
  }, []);

  useEffect(() => {
    console.log("Fetching account status useEffect");
    if (accountStatus === "") {
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/account/${handle}`)
        .then((x) => x.json())
        .then((x) => {
          setAccountStatus(x.accountType);
        });
    }
  }, [accountStatus]);

  useEffect(() => {
    console.log("Fetching archived tweets useEffect");
    if (Object.keys(archivedTweets).length === 0) {
      const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/archive/tweets/${handle}`;
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
    }
  }, [archivedTweets]);

  return <div></div>;
}

export default FetchData;

export { accountStatusAtom };
