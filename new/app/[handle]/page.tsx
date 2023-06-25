// import { groupByUrl, validUrlsFilter } from "@/lib/utils";
// import Tweets from "./Tweets";
// import { DeletedTweet } from "@/lib/types";

import AccountStatus from "./AccountStatus";

// async function getUnique(data: any) {
//   return data.filter(validUrlsFilter).reduce(groupByUrl, {});
// }

async function Page({ params: { handle } }: { params: { handle: string } }) {
  // const [blah, setBlah] = useState("");
  // const [accountStatus, setAccountStatus] = useAtom(accountStatusAtom);

  // useEffect(() => {
  //   setBlah("jojo");
  // console.log(
  //   `${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/account/${handle}`
  // );
  // fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/twitter/account/${handle}`)
  //   .then((x) => x.json())
  //   .then((x) => {
  //     console.log(x.accountType);
  //     setAccountStatus(x.accountType);
  //   });
  // const archivedTweetsPromise = fetch(
  //   `${process.env.NEXT_PUBLIC_SITE_URL}/api/archive/tweets/${handle}`
  // );
  // const [accountStatusResponse, archivedTweetsResponse] = await Promise.all([
  //   accountStatusPromise,
  //   archivedTweetsPromise,
  // ]);
  // const accountStatusJson = await accountStatusResponse.json();
  // setAccountStatus("active");
  // }, []);
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
      <div>{Object.keys(tweetToArchivesMap).length}</div> */}
      {handle}
      <br />
      <AccountStatus handle={handle} />
    </div>
  );
}

export default Page;
