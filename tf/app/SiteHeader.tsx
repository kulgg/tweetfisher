import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SiteHeader() {
  return (
    <header className="py-10 flex items-center justify-between">
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
        <ModeToggle />
      </nav>
    </header>
  );
}

export default SiteHeader;
