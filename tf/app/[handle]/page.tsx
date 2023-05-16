import Tweet from "@/components/tweet";
import { Skeleton } from "@/components/ui/skeleton";
import { groupByUrl, validUrlsFilter } from "@/lib/utils";
import { Suspense } from "react";

async function getUnique(data: any) {
  return data.filter(validUrlsFilter).reduce(groupByUrl, {});
}

async function Page({ params }: { params: { handle: string } }) {
  const { handle } = params;
  const accountStatusPromise = fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/account/${handle}`
  );
  const archivedTweetsPromise = fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/archive/tweets/${handle}`
  );

  const [accountStatusResponse, archivedTweetsResponse] = await Promise.all([
    accountStatusPromise,
    archivedTweetsPromise,
  ]);

  const accountStatus = await accountStatusResponse.json();
  const archivedTweets = await archivedTweetsResponse.json();
  const tweetToArchivesMap = await getUnique(archivedTweets);

  console.log(tweetToArchivesMap[Object.keys(tweetToArchivesMap).at(0)!][0]);

  return (
    <div className="min-h-screen max-w-[670px] mx-auto mt-20">
      <Suspense
        fallback={
          <Skeleton className="w-[670px] h-[300px] bg-slate-100 dark:bg-slate-800" />
        }
      >
        <Tweet
          archive={
            tweetToArchivesMap[Object.keys(tweetToArchivesMap).at(0)!][0]
          }
        />
      </Suspense>
      <div>{archivedTweets.length}</div>
      <div>{Object.keys(tweetToArchivesMap).length}</div>
      {JSON.stringify(accountStatus)}
    </div>
  );
}

export default Page;
