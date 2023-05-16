import { groupByUrl, validUrlsFilter } from "@/lib/utils";

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

  return (
    <div className="min-h-screen">
      <div>{archivedTweets.length}</div>
      <div>{Object.keys(tweetToArchivesMap).length}</div>
      {JSON.stringify(accountStatus)}
    </div>
  );
}

export default Page;
