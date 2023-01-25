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
};

function replaceNamedEntities(s: string) {
  s = s.replaceAll("&lt;", "<");
  s = s.replaceAll("&gt;", ">");
  s = s.replaceAll("&quot;", '"');
  s = s.replaceAll("&#39;", "'");
  s = s.replaceAll("&nbsp;", " ");
  return s;
}

function ArchivedTweet({
  pfp,
  text,
  url,
  handle,
  username,
  created,
}: TweetProps) {
  const [pfpUrl, setPfpUrl] = useState(pfp);
  const emojiRegex = /<img class="Emoji Emoji--forText".+?alt="(.+?)".+?>/gm;
  const handleRegex = /<a href=".+?<b>(.+?)<\/b><\/a>/gm;
  const linkRegex = /<a href=".+?>(.+?)<\/a>/gm;
  const emojiInUsernameRegex =
    /<span class="Emoji Emoji--forLinks.+?<span class="visuallyhidden".+?>(.+?)<\/span>/gm;
  text = text.replaceAll(emojiRegex, "$1");
  text = text.replaceAll(handleRegex, "@$1");
  text = text.replaceAll(linkRegex, " $1");
  text = replaceNamedEntities(text);
  username = username.replaceAll(emojiInUsernameRegex, "$1");
  username = replaceNamedEntities(username);

  const fallbackPfp =
    "https://www.clipartmax.com/png/small/165-1658552_man-silhouette-clip-art-profile-clipart.png";

  return (
    <div className="w-full border-b border-gray-700 sm:w-[598px]">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div>
            <img
              src={pfpUrl}
              alt="profile pic"
              className="h-12 w-12 rounded-full sm:h-14 sm:w-14"
              onError={() => {
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
      <div className="my-3 text-xl sm:my-6 sm:text-2xl">{text}</div>
      <div className="text-[15px] text-neutral-500 sm:text-base">{created}</div>
      <div className="my-3 sm:my-6"></div>
    </div>
  );
}

export default ArchivedTweet;
