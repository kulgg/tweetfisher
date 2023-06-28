"use client";

import { getAccountTypeName } from "@/components/StatusBar";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
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

function FetchData({ handle }: { handle: string }) {
  const [accountStatus, setAccountStatus] = useAtom(accountStatusAtom);
  const [accountName, setAccountName] = useAtom(accountNameAtom);
  const [archivedTweets, setArchivedTweets] = useAtom(archivedTweetsAtom);
  const [twitterStatusQueue, setTwitterStatusQueue] = useAtom(
    twitterStatusQueueAtom
  );
  const setArchiveQueue = useSetAtom(archiveQueueAtom);
  const [deletedTweets, setDeletedTweets] = useAtom(deletedTweetsAtom);
  const setNumStatusResponses = useSetAtom(numStatusResponsesAtom);
  const setMissedTweets = useSetAtom(missedTweetsAtom);

  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [isLoadingArchives, setIsLoadingArchvies] = useState(true);
  const isLoadingFirstTweet =
    twitterStatusQueue.length > 0 && deletedTweets.length === 0;

  const { toast } = useToast();

  useEffect(() => {
    if (accountName != handle) {
      scrollTo({ top: 0 });
      setAccountName(handle);
      setAccountStatus("");
      setNumStatusResponses(0);
      setArchivedTweets({});
      setTwitterStatusQueue([]);
      setArchiveQueue([]);
      setMissedTweets([]);
      setDeletedTweets([]);
    } else {
      setIsLoadingStatus(false);
      setIsLoadingArchvies(false);
    }
  }, []);

  useEffect(() => {
    console.log("Fetching account status useEffect");
    if (accountStatus === "") {
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/account/${handle}`)
        .then((x) => x.json())
        .then((x) => {
          setAccountStatus(x.accountType);
          setIsLoadingStatus(false);
          toast({
            title: `@${handle}`,
            description: `${getAccountTypeName(x.accountType)} Account`,
          });
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
          setIsLoadingArchvies(false);
        });
    }
  }, [archivedTweets]);

  return (
    <div className="dark:text-slate-200 text-slate-600 flex flex-col gap-10">
      {isLoadingStatus ? (
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <Icons.spinner className="w-5 h-5 animate-spin" />
            <div className="text-lg">Loading account status</div>
          </div>
        </div>
      ) : null}
      {isLoadingArchives ? (
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <Icons.spinner className="w-5 h-5 animate-spin" />
            <div className="text-lg">Loading archived tweets</div>
          </div>
        </div>
      ) : null}
      {isLoadingFirstTweet ? (
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <Icons.spinner className="w-5 h-5 animate-spin" />
            <div className="text-lg">Searching for deleted tweets</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default FetchData;

export { accountStatusAtom };
