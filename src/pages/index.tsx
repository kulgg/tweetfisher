import { motion } from "framer-motion";
import next, { type NextPage } from "next";
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

export type DeletedTweet = {
  archiveDate: string;
  url: string;
};

export type FullDeletedTweet = {
  tweet: string;
  username: string;
  date: string;
  avatarUrl: string;
  url: string;
  handle: string;
  replyTo: string | null;
  imageUrls: string[];
};

const Home: NextPage = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState<
    "active" | "suspended" | "noutfound" | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const { requestsPerSecond: twitterTps, setRequestsPerSecond: setTwitterTps } =
    useFetchQueue({
      urlQueue: tweetQueue,
      setUrlQueue: setTweetQueue,
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

  const handleSave = (twitterTpsInput: string, archiveTpsInput: string) => {
    const twitterTpsFloat = parseFloat(twitterTpsInput);
    if (!isNaN(twitterTpsFloat)) {
      setTwitterTps(twitterTpsFloat);
    }
    const archiveTpsFloat = parseFloat(archiveTpsInput);
    if (!isNaN(archiveTpsFloat)) {
      setArchiveTps(archiveTpsFloat);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.currentTarget.value);
  };

  const refetchMissed = () => {
    setTweetQueue((prev) => [...prev, ...missedTweets]);
    setMissedTweets([]);
  };

  const { requestsPerSecond: archiveTps, setRequestsPerSecond: setArchiveTps } =
    useFetchQueue({
      urlQueue: archiveQueue,
      setUrlQueue: setArchiveQueue,
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

  const reset = () => {
    setUsernameInput("");
    setFullDeletedTweet([]);
    setTweetQueue([]);
    setMissedTweets([]);
    setArchiveQueue([]);
    setTweetToArchivesMap({});
    setNumStatusResponses(0);
    setNumDeleted(0);
    setNumUniqueTweets(0);
    setNumStatusResponses(0);
    setNumArchiveResponses(0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameInput.length === 0) {
      return;
    }
    setUsername(usernameInput.replace("@", ""));
    reset();

    const newUsername = usernameInput.replace("@", "");
    fetch(`/api/twitter/account/${newUsername}`)
      .then((response) => response.json())
      .then((data) => {
        const { accountType } = data;
        setAccountType(accountType);
      });
    setIsLoading(true);

    fetch(`/api/archive/tweets/${newUsername}`)
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((data) => {
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
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <motion.div
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div
          variants={FADE_DOWN_ANIMATION}
          className="flex justify-center"
        >
          <StarOnGithubButton href="https://github.com/kulgg/tweetfisher" />
        </motion.div>
        <motion.h1
          variants={FADE_DOWN_ANIMATION}
          className="my-4 mr-auto bg-gradient-to-r from-emerald-200 to-rose-200 bg-clip-text text-center text-[39px] font-bold text-transparent sm:my-10 sm:text-7xl"
        >
          Find Deleted Tweets
        </motion.h1>
        <motion.div variants={FADE_DOWN_ANIMATION}>
          <UsernameForm
            handleChange={handleUsernameChange}
            handleSubmit={handleSubmit}
            username={usernameInput}
            handleSettingsClick={() => setIsSettingsModalVisible(true)}
          />
        </motion.div>
      </motion.div>
      <div className="flex flex-col items-center">
        <div className="mt-16"></div>
        {isLoading && (
          <LoadingMessage message="Searching for archived tweets" />
        )}
        {username && tweetQueue.length > 0 && (
          <LoadingMessage message={`Checking status of tweets`} />
        )}
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
        handleSave={handleSave}
      />
    </Layout>
  );
};

export default Home;
