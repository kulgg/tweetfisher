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
  created: Date;
};

function Tweet({ pfp, text, url, handle, username, created }: TweetProps) {
  return (
    <a href={url}>
      <div className="w-[598px] border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div>
            <img
              src={pfp}
              alt="profile pic"
              className="h-14 w-14 rounded-full"
            />
          </div>
          <div>
            <div className="text-lg font-semibold">{username}</div>
            <div className="text-neutral-500">@{handle}</div>
          </div>
        </div>
        <div className="my-6 text-2xl">{text}</div>
        <div className="text-neutral-500">{formatDate(created)}</div>
        <div className="my-6"></div>
      </div>
    </a>
  );
}

export default Tweet;
