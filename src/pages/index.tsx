import throttledQueue from "throttled-queue";
import ProgressBar from "@ramonak/react-progress-bar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import DeletedTweets from "../components/deleted-tweets";
import LoadingMessage from "../components/loading-message";
import fetchTweetStatus from "../utils/fetch";
import LoadingTweetsOverlay from "../components/loading-tweets-overlay";
import UsernameForm from "../components/username-form";
import StickyHeader from "../components/sticky-header";
import useScroll from "../lib/hooks/use-scroll";
import ScrollToTop from "../components/scroll-to-top";
import FadeUpContainer from "../components/fade-up-container";
import SettingsModal from "../components/settings-modal";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/layout/header";
import Layout from "../components/layout/layout";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION } from "../lib/animations";

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
  const isScrollToTopVisible = useScroll(1500);

  return (
    <Layout>
      {step === 2 && isHeaderVisible && (
        <StickyHeader
          numFetched={numFetched}
          numTotal={archiveQuery.data?.length}
          numMissed={missedTweets.length}
        />
      )}
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
          <a
            href="https://github.com/kulgg/deletedtweets"
            target="_blank"
            className="group my-auto flex h-9 items-center justify-center gap-1 rounded-3xl border border-gray-500 bg-gradient-to-tl from-slate-900 via-purple-900 to-slate-900 px-3 py-1 text-slate-200 shadow-sm shadow-gray-300 hover:border-gray-300 hover:delay-75 active:scale-105"
          >
            <div className="mt-[1px] w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </div>
            <div className="whitespace-no-wrap">Star on GitHub</div>
            {/* <div className="h-5 w-5 group-hover:text-orange-300 group-hover:delay-75 group-hover:duration-100">
              <StarIcon />
            </div> */}
          </a>
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
          />
          <div className="flex justify-end gap-2">
            <div
              onClick={() => setIsSettingsModalVisible(true)}
              className="mt-2 flex cursor-pointer items-center justify-center gap-1 rounded-3xl border border-gray-500 bg-neutral-700 px-3 py-1 text-slate-200 shadow-sm shadow-gray-300 hover:border-gray-300 hover:delay-75 active:scale-105"
            >
              <div className="mt-[1px] w-6">
                <Cog6ToothIcon />
              </div>
              <div>Settings</div>
            </div>
          </div>
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
        {step === 2 && (
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
        )}
        {step >= 2 && <DeletedTweets tweets={fullDeletedTweet} />}
        {step >= 2 && fullDeletedTweet.length < deletedTweets.length && (
          <LoadingTweetsOverlay
            numLoaded={fullDeletedTweet.length}
            total={deletedTweets.length}
          />
        )}
      </div>
      <SettingsModal
        isVisible={isSettingsModalVisible}
        setIsVisible={setIsSettingsModalVisible}
        twitterTps={twitterTps}
        archiveTps={archiveTps}
        handleSave={handleSave}
      />
      {isScrollToTopVisible && <ScrollToTop />}
    </Layout>
  );
};

export default Home;
