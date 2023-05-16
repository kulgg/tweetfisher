import { SettingsDialog } from "@/components/SettingsDialog";
import React from "react";
import { Icons } from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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

const getAccountTypeName = (accountType: string) => {
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

async function StatusBar({ handle }: StatusBarProps) {
  const accountStatus = "suspended";

  return (
    <footer className="fixed bottom-0 left-1/2 h-12 w-full -translate-x-1/2 bg-slate-100 dark:bg-gray-800 px-2 text-slate-800 dark:text-gray-100 lg:px-0">
      <div className="flex w-full h-12 items-center justify-between container">
        {handle ? (
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger className="cursor-default">
                  <div className="whitespace-nowrap bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-lg font-bold text-transparent">
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
                        {0}
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
                        {0}
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
                      {0}
                    </span>
                    {
                      0 > 0 && null
                      // <GrayButton handleClick={handleRefetchClick}>
                      //   <ArrowPathIcon className="h-4 w-4" />
                      // </GrayButton>
                    }
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
                            {0}
                          </span>{" "}
                          <span className="text-xs">in queue</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {0}
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
                            {0}
                          </span>{" "}
                          <span className="text-xs">in queue</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {0}
                        </span>{" "}
                        <span className="text-xs">responses</span>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-base dark:text-slate-200 text-slate-800">
                    Archive Status Queue
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <div></div>
        )}
        <SettingsDialog />
      </div>
    </footer>
  );
}

export default StatusBar;
