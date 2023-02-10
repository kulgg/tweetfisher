import { NextPage } from "next";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import DeletedTweets from "../components/deleted-tweets";
import Layout from "../components/layout/layout";
import StickyFooter from "../components/layout/sticky-footer";
import LoadingMessage from "../components/loading-message";
import SettingsModal from "../components/settings-modal";
import StarOnGithubButton from "../components/ui/buttons/star-github";
import UsernameForm from "../components/username-form";
import { FADE_DOWN_ANIMATION } from "../lib/animations";
import useFetchQueue from "../lib/hooks/use-fetch-queue";
import fetchTweetStatus, { wrapTweetUrl } from "../utils/fetch";
import { groupByUrl, ITweetMap, validUrlsFilter } from "../utils/filter";
import {
  archiveTpsAtom,
  FullDeletedTweet,
  handleSettingsSave,
  twitterTpsAtom,
} from ".";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const ResultsPage: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [twitterTps, setTwitterTps] = useAtom(twitterTpsAtom);
  const [archiveTps, setArchiveTps] = useAtom(archiveTpsAtom);

  const [accountType, setAccountType] = useState<
    "active" | "suspended" | "noutfound" | null
  >(null);
  const [isLoadingAccounType, setIsLoadingAccounType] = useState(true);
  const [isLoadingTweets, setIsLoadingTweets] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tweetQueue, setTweetQueue] = useState<string[]>([]);
  const [archiveQueue, setArchiveQueue] = useState<[string, number][]>([]);
  const [missedTweets, setMissedTweets] = useState<string[]>([]);
  const [tweetToArchivesMap, setTweetToArchivesMap] = useState<ITweetMap>({});
  const tweetToArchivesMapRef = useRef(tweetToArchivesMap);
  const [numUniqueTweets, setNumUniqueTweets] = useState(0);
  const [numStatusResponses, setNumStatusResponses] = useState(0);
  const [numArchiveResponses, setNumArchiveResponses] = useState(0);
  const [numDeleted, setNumDeleted] = useState(0);
  const [fullDeletedTweet, setFullDeletedTweet] = useState<FullDeletedTweet[]>(
    []
  );

  useEffect(() => {
    tweetToArchivesMapRef.current = tweetToArchivesMap;
  }, [tweetToArchivesMap]);

  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  useFetchQueue({
    queue: tweetQueue,
    setQueue: setTweetQueue,
    requestsPerSecond: twitterTps,
    setRequestsPerSecond: setTwitterTps,
    invalidateCanary: username,
    action: (response, invalidated, curr) => {
      if (invalidated) {
        console.log("invalidated");
        return;
      }
      const x = response.status;
      setNumStatusResponses((prev) => prev + 1);
      if (x === 429 || x >= 500) {
        setMissedTweets((prev) => [...prev, curr]);
        return;
      }
      if (x === 404) {
        setArchiveQueue((prev) => [...prev, [curr, 0]]);
        setNumDeleted((prev) => prev + 1);
      }
    },
    urlAccessor: (s) => {
      if (
        !tweetToArchivesMapRef.current[s] ||
        tweetToArchivesMapRef.current[s]!.length === 0
      ) {
        return "";
      }
      const url = tweetToArchivesMapRef.current[s]![0]!.url;
      return wrapTweetUrl(url);
    },
  });

  const refetchMissed = () => {
    setTweetQueue((prev) => [...prev, ...missedTweets]);
    setMissedTweets([]);
  };

  useFetchQueue({
    queue: archiveQueue,
    setQueue: setArchiveQueue,
    requestsPerSecond: archiveTps,
    setRequestsPerSecond: setArchiveTps,
    invalidateCanary: username,
    action: (response, invalidated, curr) => {
      if (invalidated) {
        console.log("invalidated archive");
        return;
      }
      const [statusId, i] = curr;
      if (
        !tweetToArchivesMapRef.current[statusId] ||
        tweetToArchivesMapRef.current[statusId]!.length <= i
      ) {
        return;
      }
      const next = tweetToArchivesMapRef.current[statusId]![i]!;

      response.json().then((x) => {
        setNumArchiveResponses((prev) => prev + 1);
        if (x !== "Server error") {
          setFullDeletedTweet((prev) => [
            ...prev,
            {
              ...x,
              url: `https://web.archive.org/web/${next.archiveDate}/${next.url}`,
              handle: username,
            },
          ]);
        } else {
          setArchiveQueue((prev) => [[statusId, i + 1], ...prev]);
        }
      });
    },
    urlAccessor: (c) => {
      const [statusId, i] = c;
      if (
        !tweetToArchivesMapRef.current[statusId] ||
        tweetToArchivesMapRef.current[statusId]!.length <= i
      ) {
        return "";
      }
      const next = tweetToArchivesMapRef.current[statusId]![i]!;

      return `/api/archive/tweet/${next.archiveDate}/${encodeURIComponent(
        next.url
      )}`;
    },
  });

  // console.log(usernameInput);
  // console.log("data", archiveQuery.data);
  // console.log("valid", tweetQueue);
  // console.log("tweetToArchivesMap", tweetToArchivesMap);
  // console.log("fullDeleted", fullDeletedTweet);
  // console.log("step", step);

  useEffect(() => {
    let invalidated = false;
    fetch(`/api/twitter/account/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (invalidated) {
          console.log("invalidated");
          return;
        }
        setIsLoadingAccounType(false);
        const { accountType } = data;
        setAccountType(accountType);

        setIsLoadingTweets(true);
        fetch(`/api/archive/tweets/${username}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (invalidated) {
              console.log("invalidated 2");
              return;
            }
            const groupedTweets: ITweetMap = data
              .filter(validUrlsFilter)
              .reduce(groupByUrl, {});

            setTweetToArchivesMap(groupedTweets);
            setNumUniqueTweets(Object.keys(groupedTweets).length);
            if (accountType !== "active") {
              setArchiveQueue(Object.keys(groupedTweets).map((x) => [x, 0]));
            } else {
              setTweetQueue(Object.keys(groupedTweets));
            }
            setFullDeletedTweet([]);
          })
          .catch((err) => {
            setIsError(true);
          })
          .finally(() => {
            setIsLoadingTweets(false);
          });
      })
      .catch((err) => {
        setIsError(true);
      });

    return () => {
      invalidated = true;
    };
  }, [isError]);

  if (username === undefined || typeof username !== "string") {
    return <div>Wtf man</div>;
  }

  return (
    <Layout>
      <div className="my-10 flex flex-col items-center">
        <div className="my-10">
          {isLoadingAccounType && (
            <motion.div
              variants={FADE_DOWN_ANIMATION}
              initial="hidden"
              animate="show"
            >
              <LoadingMessage message="Loading account status" />
            </motion.div>
          )}
          {isLoadingTweets && (
            <motion.div
              variants={FADE_DOWN_ANIMATION}
              initial="hidden"
              animate="show"
            >
              <LoadingMessage message="Searching for archived tweets" />
            </motion.div>
          )}
          {username && tweetQueue.length > 0 && (
            <motion.div
              variants={FADE_DOWN_ANIMATION}
              initial="hidden"
              animate="show"
            >
              <LoadingMessage message={`Checking status of tweets`} />
            </motion.div>
          )}
        </div>
        {username && <DeletedTweets tweets={fullDeletedTweet} />}
      </div>
      {username && (
        <StickyFooter
          accountType={accountType ?? ""}
          numUniqueTweets={numUniqueTweets}
          numTotalDeletedTweets={numDeleted}
          tweetStatusQueueLength={tweetQueue.length}
          archiveQueueLength={archiveQueue.length}
          numMissedTweetStati={missedTweets.length}
          numStatusResponses={numStatusResponses}
          numArchiveResponses={numArchiveResponses}
          handleRefetchClick={refetchMissed}
          handle={username}
          handleSettingsClick={() => setIsSettingsModalVisible(true)}
        />
      )}
      <SettingsModal
        isVisible={isSettingsModalVisible}
        setIsVisible={setIsSettingsModalVisible}
        twitterTps={twitterTps}
        archiveTps={archiveTps}
        handleSave={handleSettingsSave(setTwitterTps, setArchiveTps)}
      />
    </Layout>
  );
};

export default ResultsPage;
