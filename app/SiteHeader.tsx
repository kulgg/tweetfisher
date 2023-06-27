import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

function SiteHeader() {
  return (
    <header className="z-50 fixed top-0 left-0 w-full bg-white dark:bg-slate-900 border-b border-b-slate-200/60 dark:border-b-slate-700/60">
      <div className="mx-auto max-w-7xl px-10 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center text-2xl">
          <Image
            src="/tweetfisher.png"
            alt="Logo image of a stork"
            width="30"
            height="30"
            className="mr-2"
          ></Image>
          <p className="font-clash">TweetFisher</p>
        </Link>
        <nav className="flex gap-2 items-center">
          <a href="https://github.com/kulgg/tweetfisher" target="_blank">
            <Button
              className="flex items-center gap-2"
              variant={"outline"}
              size="sm"
            >
              <Icons.gitHub className="w-5 h-5" /> Star on GitHub
            </Button>
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
