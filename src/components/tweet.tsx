import React, { useState } from "react";
import Image from "next/image";
import { setDefaultResultOrder } from "dns/promises";
import { formatDate } from "../utils/date";

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

function ArchivedTweet({
  pfp,
  text,
  url,
  handle,
  username,
  created,
  imageUrls,
  replyTo,
}: TweetProps) {
  const [pfpUrl, setPfpUrl] = useState(pfp);

  const fallbackPfp = "/anon.png";

  let replyToMessage = "";
  let replyToHandle = "";

  if (replyTo) {
    const indexOfAt = replyTo.indexOf("@");
    replyToHandle = replyTo.substring(indexOfAt);
    replyToMessage = replyTo.substring(0, indexOfAt);
  }

  return (
    <div className="w-full overflow-x-hidden border-b border-gray-700">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div>
            <img
              src={pfpUrl}
              alt="profile pic"
              className="h-12 w-12 rounded-full sm:h-14 sm:w-14"
              onError={() => {
                if (pfpUrl === pfp) {
                  setPfpUrl(pfp.replace("_bigger", "_400x400"));
                  return;
                }
                setPfpUrl(fallbackPfp);
              }}
            />
          </div>
          <div>
            <div className="font-semibold sm:text-lg">{username}</div>
            <div className="text-sm text-neutral-500 sm:text-base">
              @{handle}
            </div>
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
          {replyToMessage}{" "}
          <span className="text-[#1d9bf0]">{replyToHandle}</span>
        </div>
      )}
      <div className="my-3 whitespace-pre-line text-xl sm:my-4 sm:text-2xl">
        {text}
      </div>
      <div
        className={`grid ${
          imageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {imageUrls.map((url) => (
          <img key={url} src={url} alt="image" className="rounded-3xl" />
        ))}
      </div>
      <div className="text-[15px] text-neutral-500 sm:text-base">{created}</div>
      <div className="my-3 sm:my-6"></div>
    </div>
  );
}

export default ArchivedTweet;
