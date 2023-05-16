/* eslint-disable @next/next/no-img-element */
import { DeletedTweet } from "@/lib/types";
import ProfilePicture from "./ProfilePicture";

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

async function Tweet({ archive }: { archive: DeletedTweet }) {
  console.log(archive);
  console.log(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/archive/tweet/${
      archive.archiveDate
    }/${encodeURIComponent(archive.url)}`
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/archive/tweet/${
      archive.archiveDate
    }/${encodeURIComponent(archive.url)}`
  );

  const { tweet, username, date, avatarUrl, replyTo, imageUrls } =
    await res.json();

  const url = "https://google.com";
  const handle = "yoyoy";

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
            className="border-1 select-none rounded-md bg-gray-700 px-2 py-1 text-xs text-gray-200 hover:underline"
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
          imageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {imageUrls.map((url: string) => (
          <img
            key={url}
            src={url}
            alt="image"
            className="max-h-96 rounded-3xl"
          />
        ))}
      </div>
      <div className="text-[15px] text-neutral-500 dark:text-neutral-500 sm:text-lg">
        {date}
      </div>
      <div className="my-3 sm:my-6"></div>
    </div>
  );
}

export default Tweet;
