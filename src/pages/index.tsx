import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import next, { type NextPage } from "next";
import React, { useEffect, useState } from "react";
import DeletedTweets from "../components/deleted-tweets";
import Layout from "../components/layout/layout";
import StickyFooter from "../components/layout/sticky-footer";
import LoadingMessage from "../components/loading-message";
import SettingsModal from "../components/settings-modal";
import StarOnGithubButton from "../components/ui/buttons/star-github";
import UsernameForm from "../components/username-form";
import { FADE_DOWN_ANIMATION } from "../lib/animations";
import fetchTweetStatus from "../utils/fetch";
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
  const [twitterTps, setTwitterTps] = useState(1.1);
  const [archiveTps, setArchiveTps] = useState(3.0);
  const [usernameInput, setUsernameInput] = useState("");
  const [username, setUsername] = useState("");
  const [tweetQueue, setTweetQueue] = useState<string[]>([]);
  const [archiveQueue, setArchiveQueue] = useState<[string, number][]>([]);
  const [missedTweets, setMissedTweets] = useState<string[]>([]);
  const [tweetToArchivesMap, setTweetToArchivesMap] = useState<ITweetMap>({});
  const [numUniqueTweets, setNumUniqueTweets] = useState(0);
  const [numStatusResponses, setNumStatusResponses] = useState(0);
  const [numArchiveResponses, setNumArchiveResponses] = useState(0);
  const [numDeleted, setNumDeleted] = useState(0);
  const [fullDeletedTweet, setFullDeletedTweet] = useState<FullDeletedTweet[]>(
    []
  );

  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

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

  useEffect(() => {
    const interval = setTimeout(() => {
      if (tweetQueue.length > 0) {
        const nextStatusId = tweetQueue[0];
        setTweetQueue((prev) => [...prev.slice(1)]);
        if (!nextStatusId) {
          return;
        }
        const tweetArchives = tweetToArchivesMap[nextStatusId];
        if (!tweetArchives) {
          return;
        }
        const first = tweetArchives[0];
        if (!first) {
          return;
        }
        fetchTweetStatus(first.url).then((x) => {
          if (x === 429 || x >= 500) {
            setMissedTweets((prev) => [...prev, nextStatusId]);
          }
          if (x === 404) {
            setArchiveQueue((prev) => [...prev, [nextStatusId, 0]]);
            setNumDeleted((prev) => prev + 1);
          }
          setNumStatusResponses((prev) => prev + 1);
        });
      }
    }, 1000 / twitterTps);

    return () => {
      clearTimeout(interval);
    };
  }, [twitterTps, tweetQueue]);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (archiveQueue.length > 0) {
        const [nextStatus, i] = archiveQueue[0]!;
        if (i > 0) {
          console.log("Refetching", nextStatus, i);
        }
        setArchiveQueue((prev) => [...prev.slice(1)]);
        if (!nextStatus) {
          return;
        }
        const next = tweetToArchivesMap[nextStatus]![i];
        if (!next) {
          console.log("No next", nextStatus, i);
          return;
        }
        fetch(
          `/api/archive/tweet/${next.archiveDate}/${encodeURIComponent(
            next.url
          )}`
        )
          .then((x) => x.json())
          .then((x) => {
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
              setArchiveQueue((prev) => [[nextStatus, i + 1], ...prev]);
            }
          });
      }
    }, 1000 / archiveTps);

    return () => {
      clearTimeout(interval);
    };
  }, [archiveTps, archiveQueue]);

  const archiveQuery = useQuery({
    queryKey: ["webarchive"],
    queryFn: async () => {
      const response = await fetch(
        `/api/archive/tweets/${usernameInput.replace("@", "")}`
      );
      const result = await response.json();
      return result;
    },
    enabled: false,
    onSuccess: (data) => {
      const groupedTweets: ITweetMap = data
        .filter(validUrlsFilter)
        .reduce(groupByUrl, {});

      setTweetToArchivesMap(groupedTweets);
      setNumUniqueTweets(Object.keys(groupedTweets).length);
      setTweetQueue(Object.keys(groupedTweets));
      setFullDeletedTweet([]);
      archiveQuery.remove();
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
    archiveQuery.refetch();
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
        {archiveQuery.isFetching && (
          <LoadingMessage message="Searching for archived tweets" />
        )}
        {username && <DeletedTweets tweets={fullDeletedTweet} />}
      </div>
      {username && (
        <StickyFooter
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
