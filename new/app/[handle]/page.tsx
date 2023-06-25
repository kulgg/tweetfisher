// import { groupByUrl, validUrlsFilter } from "@/lib/utils";
// import Tweets from "./Tweets";
// import { DeletedTweet } from "@/lib/types";

import AccountStatus from "./AccountStatus";
import FetchTweets from "./FetchTweets";

async function Page({ params: { handle } }: { params: { handle: string } }) {
  return (
    <div className="min-h-screen max-w-[670px] mx-auto mt-20">
      <AccountStatus handle={handle} />
      <FetchTweets handle={handle} />
    </div>
  );
}

export default Page;
