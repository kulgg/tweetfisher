import React from "react";
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
};

function Tweet({ pfp, text, url, handle, username, created }: TweetProps) {
  return (
    <a href={url}>
      <div className="w-full border-b border-gray-700 sm:w-[598px]">
        <div className="flex items-center gap-3">
          <div>
            <img
              src={pfp}
              alt="profile pic"
              className="h-12 w-12 rounded-full sm:h-14 sm:w-14"
            />
          </div>
          <div>
            <div className="font-semibold sm:text-lg">{username}</div>
            <div className="text-sm text-neutral-500 sm:text-base">
              @{handle}
            </div>
          </div>
        </div>
        <div className="my-3 text-xl sm:my-6 sm:text-2xl">{text}</div>
        <div className="text-[15px] text-neutral-500 sm:text-base">
          {created}
        </div>
        <div className="my-3 sm:my-6"></div>
      </div>
    </a>
  );
}

export default Tweet;
