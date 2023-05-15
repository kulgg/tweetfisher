import Image from "next/image";
import Link from "next/link";
import React from "react";

function SiteHeader() {
  return (
    <header className="py-10">
      <Link href="/" className="flex items-center text-2xl">
        <Image
          src="/anon-modified.png"
          alt="Logo image of a stork"
          width="30"
          height="30"
          className="mr-2"
        ></Image>
        <p className="font-clash">TweetFisher</p>
      </Link>
    </header>
  );
}

export default SiteHeader;
