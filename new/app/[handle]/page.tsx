// import { groupByUrl, validUrlsFilter } from "@/lib/utils";
// import Tweets from "./Tweets";
// import { DeletedTweet } from "@/lib/types";

import Tweet from "@/components/Tweet";
import AccountStatus from "./AccountStatus";
import FetchTweets from "./FetchTweets";
import Tweets from "./Tweets";

async function Page({ params: { handle } }: { params: { handle: string } }) {
  return (
    <div className="min-h-screen max-w-[670px] mx-auto my-24">
      <AccountStatus handle={handle} />
      <FetchTweets handle={handle} />
      <Tweets handle={handle} />
    </div>
  );
}

export default Page;
