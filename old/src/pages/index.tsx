import { motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import SettingsModal from "../components/settings-modal";
import StarOnGithubButton from "../components/ui/buttons/star-github";
import UsernameForm from "../components/username-form";
import { FADE_DOWN_ANIMATION } from "../lib/animations";

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

export const handleSettingsSave = (setTwitterTps: any, setArchiveTps: any) => {
  return (twitterTpsInput: string, archiveTpsInput: string) => {
    const twitterTpsFloat = parseFloat(twitterTpsInput);
    if (!isNaN(twitterTpsFloat)) {
      setTwitterTps(twitterTpsFloat);
    }
    const archiveTpsFloat = parseFloat(archiveTpsInput);
    if (!isNaN(archiveTpsFloat)) {
      setArchiveTps(archiveTpsFloat);
    }
  };
};

export const twitterTpsAtom = atomWithStorage("twitterTps", 0.99);
export const archiveTpsAtom = atomWithStorage("archiveTps", 0.99);
export const animatedOnce = atom(false);

const Home: NextPage = () => {
  const [twitterTps, setTwitterTps] = useAtom(twitterTpsAtom);
  const [archiveTps, setArchiveTps] = useAtom(archiveTpsAtom);
  const [isAnimatedOnce, setIsAnimatedOnce] = useAtom(animatedOnce);
  const router = useRouter();
  const [usernameInput, setUsernameInput] = useState("");
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameInput.length === 0) {
      return;
    }
    const newUsername = usernameInput.replace("@", "");
    router.push(`/${newUsername}`);
  };

  useEffect(() => {
    setIsAnimatedOnce(true);
  }, []);

  return (
    <Layout>
      <motion.div
        initial={isAnimatedOnce ? "show" : "hidden"}
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

export default Home;
