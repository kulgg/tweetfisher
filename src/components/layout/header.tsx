import Link from "next/link";
import Image from "next/image";
import React from "react";
import useScroll from "../../lib/hooks/use-scroll";

function Header() {
  const scrolled = useScroll(50);
  return (
    <div
      className={`fixed top-0 w-full ${
        scrolled
          ? "border-b border-gray-700 bg-gray-800/50 backdrop-blur-xl"
          : "border-b border-gray-900 bg-black"
      } z-30 transition-all`}
    >
      <div className="mx-5 flex h-16 max-w-6xl items-center justify-between xl:mx-auto">
        <Link href="/" className="flex items-center font-display text-2xl">
          <Image
            src="/anon-modified.png"
            alt="Logo image of a stork"
            width="30"
            height="30"
            className="mr-2"
          ></Image>
          <p>TweetFisher</p>
        </Link>
        <div className="flex items-center space-x-4">
          <a
            href="https://vercel.com/templates/next.js/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="1155"
              height="1000"
              viewBox="0 0 1155 1000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="white" />
            </svg>
          </a>
          <a
            href="https://github.com/kulgg/deletedtweets"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
