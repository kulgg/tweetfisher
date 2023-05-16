import { SettingsDialog } from "@/components/SettingsDialog";
import React from "react";
import { Icons } from "./icons";

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
  data?: FetchProcessData;
}

function StatusBar({ data }: StatusBarProps) {
  return (
    <footer className="fixed bottom-0 left-1/2 h-12 w-full -translate-x-1/2 bg-slate-100 dark:bg-gray-800 px-2 text-slate-800 dark:text-gray-100 lg:px-0">
      <div className="flex w-full h-12 items-center justify-between container">
        {data ? (
          <div className="flex items-center gap-3">
            <div className="whitespace-nowrap bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-lg font-bold text-transparent">
              @handle
            </div>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Icons.archive className="h-5 w-5" />
              <div>
                <span className="font-semibold dark:text-gray-200 text-primary">
                  {0}
                </span>
              </div>
            </div>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Icons.trash className="h-5 w-5" />
                <span className="font-semibold dark:text-gray-200 text-primary">
                  {0}
                </span>
              </div>
            </div>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <div className="flex items-center justify-center gap-4">
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
              <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
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
              <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
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
            </div>
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
