import throttledQueue from "throttled-queue";
import ProgressBar from "@ramonak/react-progress-bar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import DeletedTweets from "../components/deleted-tweets";
import LoadingMessage from "../components/loading-message";
import fetchTweetStatus from "../utils/fetch";
import StickyFooter from "../components/layout/sticky-footer";
import UsernameForm from "../components/username-form";
import FetchProgressBar from "../components/fetch-progress-bar";
import useScroll from "../lib/hooks/use-scroll";
import ScrollToTop from "../components/scroll-to-top";
import FadeUpContainer from "../components/fade-up-container";
import SettingsModal from "../components/settings-modal";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/layout/sticky-header";
import Layout from "../components/layout/layout";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION } from "../lib/animations";
import StarOnGithubButton from "../components/ui/buttons/star-github";
import GrayButton from "../components/ui/buttons/gray-button";

type DeletedTweet = {
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
  const twitterRequestQueue = useCallback(
    throttledQueue(twitterTps, 1000, true),
    [twitterTps]
  );
  const archiveRequestQueue = useCallback(
    throttledQueue(archiveTps, 1000, true),
    [archiveTps]
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

  console.log("twitterQueue", twitterRequestQueue);
  console.log("twitterTps", twitterTps);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [usernameInput, setUsernameInput] = useState("");
  const [username, setUsername] = useState("");
  const [deletedTweets, setDeletedTweets] = useState<DeletedTweet[]>([]);
  const [missedTweets, setMissedTweets] = useState<DeletedTweet[]>([]);
  const [numFetched, setNumFetched] = useState(0);
  const [fullDeletedTweet, setFullDeletedTweet] = useState<FullDeletedTweet[]>(
    []
  );
  const [fetchedUrls, setFetchedUrls] = useState<string[]>([]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.currentTarget.value);
  };

  const fetchTweetStati = (
    data: DeletedTweet[],
    is_refetch: boolean = false
  ) => {
    for (let i = 0; i < data.length; i++) {
      twitterRequestQueue(() => {
        if (data && data[i]) {
          fetchTweetStatus(data[i]!.url).then((x) => {
            if (is_refetch) {
              if (x === 429 || x === 500) {
                return;
              }

              if (x === 404) {
                setDeletedTweets((prev) => [...prev, data[i]!]);
              }
              setMissedTweets((prev) =>
                prev.filter((x) => x.url !== data[i]!.url)
              );
              return;
            }

            if (x === 429 || x === 500) {
              setMissedTweets((prev) => [...prev, data[i]!]);
            }
            if (x === 404) {
              setDeletedTweets((prev) => [...prev, data[i]!]);
            }
            setNumFetched((prev) => prev + 1);
          });
        }
      });
    }
  };

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
      setStep(2);
      fetchTweetStati(data);
    },
  });

  console.log(usernameInput);
  console.log("data", archiveQuery.data);
  console.log("deleted", deletedTweets);
  console.log("fullDeleted", fullDeletedTweet);
  console.log("step", step);

  const reset = () => {
    setUsernameInput("");
    setStep(1);
    setDeletedTweets([]);
    setFullDeletedTweet([]);
    setMissedTweets([]);
    setFetchedUrls([]);
    setNumFetched(0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    setUsername(usernameInput.replace("@", ""));
    reset();
    archiveQuery.refetch();
  };

  useEffect(() => {
    for (let i = 0; i < deletedTweets.length; i++) {
      if (fetchedUrls.find((x) => x === deletedTweets[i]!.url)) {
        console.log("Skipping", deletedTweets[i]!.url);
        continue;
      }
      console.log("Fetching", deletedTweets[i]!.url);
      setFetchedUrls((prev) => [...prev, deletedTweets[i]!.url]);
      archiveRequestQueue(() =>
        fetch(
          `/api/archive/tweet/${
            deletedTweets[i]!.archiveDate
          }/${encodeURIComponent(deletedTweets[i]!.url)}`
        )
          .then((x) => x.json())
          .then((x) => {
            if (x !== "Server error") {
              setFullDeletedTweet((prev) => [
                ...prev,
                {
                  ...x,
                  url: `https://web.archive.org/web/${
                    deletedTweets[i]!.archiveDate
                  }/${deletedTweets[i]!.url}`,
                  handle: username,
                },
              ]);
            }
          })
      );
    }
  }, [deletedTweets]);

  if (
    step !== 3 &&
    step !== 4 &&
    archiveQuery.data &&
    numFetched === archiveQuery.data.length
  ) {
    setStep(3);
  }
  if (
    step !== 4 &&
    archiveQuery.data &&
    numFetched === archiveQuery.data.length &&
    fullDeletedTweet.length === deletedTweets.length
  ) {
    setStep(4);
  }

  const isHeaderVisible = useScroll(400);

  return (
    <Layout
      progressBar={
        step === 2 ? (
          <FetchProgressBar
            numFetched={numFetched}
            numTotal={archiveQuery.data?.length}
            numMissed={missedTweets.length}
          />
        ) : (
          <div></div>
        )
      }
    >
      {/* {step === 2 && isHeaderVisible && (
        <StickyHeader
          numFetched={numFetched}
          numTotal={archiveQuery.data?.length}
          numMissed={missedTweets.length}
        />
      )} */}
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
          <StarOnGithubButton href="https://github.com/kulgg/deletedtweets" />
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
        <div className="mt-6"></div>
        {username && (
          <div className="mb-3 mr-auto rounded-lg bg-gray-800 py-1 px-2 text-lg text-zinc-300">
            @{username}
          </div>
        )}
        {archiveQuery.isFetching && (
          <LoadingMessage message="Searching for archived tweets" />
        )}
        {step >= 2 && (
          <div className="">
            <div className="grid grid-cols-3 gap-2 text-lg">
              <span className="text-right font-semibold text-emerald-200">
                {archiveQuery.data.length}
              </span>
              <div className="col-span-2">archived tweets.</div>
            </div>
            <div className="">
              <div className="grid grid-cols-3 gap-2 text-lg">
                <span className="text-right font-semibold text-rose-200">
                  {deletedTweets.length}
                </span>
                <div className="col-span-2">deleted tweets.</div>
              </div>
            </div>
            {missedTweets.length > 0 && (
              <div className="">
                <div className="grid grid-cols-3 gap-2 text-lg">
                  <span className="text-right font-semibold text-gray-200">
                    {missedTweets.length}
                  </span>
                  <div className="col-span-2 flex items-center gap-2">
                    missed tweets.
                    <div
                      onClick={() => fetchTweetStati(missedTweets, true)}
                      className="cursor-pointer rounded-full bg-gray-600 p-1 text-gray-100 hover:bg-gray-500 hover:text-white active:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* {step === 2 && (
          <div className="my-7 w-full">
            <LoadingMessage message="Checking for deleted tweets" />
            <div className="my-2"></div>
            <ProgressBar
              completed={numFetched}
              maxCompleted={archiveQuery.data?.length}
              className="w-full rounded-full border border-gray-400"
              bgColor="#a7f3d0"
              baseBgColor="#374151"
              isLabelVisible={false}
            />
          </div>
        )} */}
        {step >= 2 && <DeletedTweets tweets={fullDeletedTweet} />}
      </div>
      {step >= 2 && (
        <StickyFooter
          numLoadedDeletedTweets={fullDeletedTweet.length}
          numTotalDeletedTweets={deletedTweets.length}
          numArchivedTweets={archiveQuery.data?.length}
          numFetchedTweetStati={numFetched}
          numMissedTweetStati={missedTweets.length}
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
