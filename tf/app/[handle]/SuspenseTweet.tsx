import Tweet, { TweetProps } from "@/components/Tweet";
import { Skeleton } from "@/components/ui/skeleton";
import { DeletedTweet } from "@/lib/types";
import React, { Suspense } from "react";

async function SuspenseTweet({ archive }: { archive: DeletedTweet }) {
  return (
    <Suspense
      fallback={
        <Skeleton className="w-[670px] h-[300px] bg-slate-100 dark:bg-slate-800" />
      }
    >
      <Tweet archive={archive} />
    </Suspense>
  );
}

export default SuspenseTweet;
