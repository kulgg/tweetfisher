"use client";
import { SettingsDialog } from "@/components/SettingsDialog";
import React, { useState } from "react";
import { Icons } from "@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components//ui/tooltip";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { usePathname } from "next/navigation";
import {
  accountStatusAtom,
  archiveQueueAtom,
  archivedTweetsAtom,
  deletedTweetsAtom,
  isAutoScrollAtom,
  missedTweetsAtom,
  numArchiveResponsesAtom,
  numStatusResponsesAtom,
  numUniqueArchivedTweetsAtom,
  twitterStatusQueueAtom,
} from "@/lib/atoms";
import { Button } from "./ui/button";
import { RotateCcwIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface FetchProcessData {
  accountType: string;
  numUniqueArchived: number;
  numDeleted: number;
  tweetStatusQueueLength: number;
  archiveQueueLength: number;
  numMissed: number;
  numStatusResponses: number;
  numArchiveResponses: number;
  handle: string;
}

export interface StatusBarProps {
  // data?: FetchProcessData;
  handle: string;
}

export const getAccountTypeName = (accountType: string) => {
  switch (accountType) {
    case "active":
      return "Active";
    case "suspended":
      return "Suspended";
    case "notfound":
      return "Nonexisting";
    default:
      return "Unknown";
  }
};

function StatusBar() {
  const pathname = usePathname();
  const handle = pathname.slice(1);
  const accountStatus = useAtomValue(accountStatusAtom);
  const numUniqueArchivedTweets = useAtomValue(numUniqueArchivedTweetsAtom);
  const twitterStatusQueue = useAtomValue(twitterStatusQueueAtom);
  const archiveQueue = useAtomValue(archiveQueueAtom);
  const numStatusResponses = useAtomValue(numStatusResponsesAtom);
  const numArchiveResponses = useAtomValue(numArchiveResponsesAtom);
  const [missedTweets, setMissedTweets] = useAtom(missedTweetsAtom);
  const setTwitterStatusQueue = useSetAtom(twitterStatusQueueAtom);
  const deletedTweets = useAtomValue(deletedTweetsAtom);

  const [isAutoScroll, setIsAutoScroll] = useAtom(isAutoScrollAtom);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <footer className="z-10 fixed bottom-0 left-1/2 h-12 w-full -translate-x-1/2 bg-slate-100 dark:bg-gray-800 px-2 text-slate-800 dark:text-gray-100 lg:px-0">
      <div className="flex w-full h-12 items-center justify-between container">
        {handle ? (
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger className="cursor-default">
                  <div className="whitespace-nowrap bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-lg font-bold text-transparent w-full">
                    @{handle}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-base dark:text-slate-200 text-slate-800">
                    {getAccountTypeName(accountStatus)} Account
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger className="cursor-default">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <Icons.archive className="h-5 w-5" />
                    <div>
                      <span className="font-semibold dark:text-gray-200 text-primary">
                        {numUniqueArchivedTweets}
                      </span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-base dark:text-slate-200 text-slate-800">
                    Unique Archived Tweets
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger className="cursor-default">
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <Icons.trash className="h-5 w-5" />
                      <span className="font-semibold dark:text-gray-200 text-primary">
                        {deletedTweets.length}
                      </span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-base dark:text-slate-200 text-slate-800">
                    Deleted Tweets Found (so far)
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger className="cursor-default">
                  <div className="flex items-center gap-2">
                    <Icons.wifiOff className="h-5 w-5" />
                    <span className="font-semibold dark:text-gray-200 text-primary">
                      {missedTweets.length}
                    </span>
                    {missedTweets.length > 0 ? (
                      <Button
                        size={"icon"}
                        className="rounded-full w-7 h-7 ml-1"
                        onClick={() => {
                          setTwitterStatusQueue((prev) => [
                            ...prev,
                            ...missedTweets.map((x) => [x]),
                          ]);
                          setMissedTweets([]);
                        }}
                      >
                        <RotateCcwIcon className="w-4 h-4" />
                      </Button>
                    ) : null}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-base dark:text-slate-200 text-slate-800">
                    Missed Tweets (429 response from Twitter)
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger className="cursor-default">
                  <div className="flex items-center gap-3">
                    {0 > 0 && <div className="w-5">Loading...</div>}
                    <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {twitterStatusQueue.length}
                          </span>{" "}
                          <span className="text-xs">in queue</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {numStatusResponses}
                        </span>{" "}
                        <span className="text-xs">responses</span>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-base dark:text-slate-200 text-slate-800">
                    Twitter Status Queue
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger className="cursor-default">
                  <div className="flex items-center gap-3">
                    {0 > 0 && <div className="w-5">Loading...</div>}
                    <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {archiveQueue.length}
                          </span>{" "}
                          <span className="text-xs">in queue</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {numArchiveResponses}
                        </span>{" "}
                        <span className="text-xs">responses</span>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-base dark:text-slate-200 text-slate-800">
                    Archive Queue
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <div></div>
        )}
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center space-x-2 scale-90">
              <Switch
                id="airplane-mode"
                className="dark:data-[state=checked]:bg-slate-50 dark:data-[state=unchecked]:bg-slate-600"
                checked={isAutoScroll}
                onCheckedChange={() => setIsAutoScroll((prev) => !prev)}
              />
              <Label htmlFor="airplane-mode">AutoScroll</Label>
            </div>
          </div>
          <Button
            variant={"default"}
            size="sm"
            className="gap-1 flex items-center"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Icons.settings className="w-4 h-4" /> Settings
          </Button>
        </div>
        <SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
      </div>
    </footer>
  );
}

export default StatusBar;
