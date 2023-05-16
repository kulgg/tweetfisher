"use client";
import React, { useState } from "react";

function ProfilePicture({ pfp }: { pfp: string }) {
  const [pfpUrl, setPfpUrl] = useState(pfp);
  const fallbackPfp = "/anon.png";

  return (
    // eslint-disable-next-line @next/next/no-img-element
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
  );
}

export default ProfilePicture;
