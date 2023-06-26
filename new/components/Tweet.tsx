/* eslint-disable @next/next/no-img-element */
import { DeletedTweet, TweetResult } from "@/lib/types";
import ProfilePicture from "./ProfilePicture";
import { Skeleton } from "./ui/skeleton";

export type TweetProps = {
  pfp: string;
  text: string;
  url: string;
  handle: string;
  username: string;
  created: string;
  imageUrls: string[];
  replyTo: string | null;
};

function Tweet({ t }: { t: TweetResult }) {
  if (t.type === "loading") return <Skeleton className="w-[670px] h-[250px]" />;

  const { tweet, username, date, avatarUrl, replyTo, imageUrls, url, handle } =
    t;

  let replyToMessage = "";
  let replyToHandles: string[] = [];

  if (replyTo) {
    replyToHandles = replyTo.split(" ").filter((x) => x.startsWith("@"));
    const indexOfAt = replyTo.indexOf("@");
    replyToMessage = replyTo.substring(0, indexOfAt);
  }

  return (
    <div className="w-full overflow-x-hidden border-b dark:border-gray-700 border-gray-100">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div>
            <ProfilePicture pfp={avatarUrl} />
          </div>
          <div>
            <div className="font-semibold sm:text-lg">{username}</div>
            <div className="text-sm text-neutral-500 sm:text-lg">@{handle}</div>
          </div>
        </div>
        <div className="">
          <a
            href={url}
            className="border-1 select-none rounded-md bg-gray-200 dark:bg-gray-700 px-2 py-1 text-xs text-gray-800 dark:text-gray-200 hover:underline"
          >
            Archive
          </a>
        </div>
      </div>
      {replyTo && (
        <div className="mt-3 ml-1 text-gray-500">
          {"replying to "}
          {replyToHandles.map((handle) => (
            <span key={handle}>
              <a
                href={`https://twitter.com/${handle.substring(1)}`}
                className="text-[#1d9bf0]"
              >
                {handle}
              </a>{" "}
            </span>
          ))}
        </div>
      )}
      <div className="my-3 whitespace-pre-line text-xl sm:my-4 sm:text-2xl">
        {tweet}
      </div>
      <div
        className={`grid ${
          imageUrls?.length === 1 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {imageUrls?.map((url: string) => (
          <img
            key={url}
            src={url}
            alt="image"
            className="max-h-96 rounded-3xl"
          />
        ))}
      </div>
      <div className="text-[15px] text-neutral-500 dark:text-neutral-500 text-base">
        {date}
      </div>
      <div className="my-3 sm:my-6"></div>
    </div>
  );
}

export default Tweet;
