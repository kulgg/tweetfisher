"use client";
import { groupByUrl, validUrlsFilter } from "@/lib/utils";
import Tweets from "./Tweets";
import { DeletedTweet } from "@/lib/types";
import { accountStatusAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

async function getUnique(data: any) {
  return data.filter(validUrlsFilter).reduce(groupByUrl, {});
}

async function Page({ params }: { params: { handle: string } }) {
  const [accountStatus, setAccountStatus] = useAtom(accountStatusAtom);
  // const { handle } = params;
  // const accountStatusPromise = fetch(
  //   `${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/account/${handle}`
  // );
  // const archivedTweetsPromise = fetch(
  //   `${process.env.NEXT_PUBLIC_SITE_URL}/api/archive/tweets/${handle}`
  // );

  // const [accountStatusResponse, archivedTweetsResponse] = await Promise.all([
  //   accountStatusPromise,
  //   archivedTweetsPromise,
  // ]);

  // const accountStatusJson = await accountStatusResponse.json();

  useEffect(() => {
    setAccountStatus("active");
  }, []);
  // const archivedTweets = await archivedTweetsResponse.json();
  // const tweetToArchivesMap = await getUnique(archivedTweets);
  // const uniqueArchivedTweets: DeletedTweet[][] = [];

  // for (const k of Object.keys(tweetToArchivesMap)) {
  //   uniqueArchivedTweets.push(tweetToArchivesMap[k]);
  // }

  return (
    <div className="min-h-screen max-w-[670px] mx-auto mt-20">
      {/* <Tweets uniqueArchivedTweets={uniqueArchivedTweets} />
      <div>{archivedTweets.length}</div>
      <div>{Object.keys(tweetToArchivesMap).length}</div>
      {JSON.stringify(accountStatusJson)} */}
    </div>
  );
}

export default Page;
