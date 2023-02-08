import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  SignalSlashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import LoadingSpin from "../loading-spin";
import GrayButton from "../ui/buttons/gray-button";
import Tooltip from "../ui/tooltip";

export type StickyFooterProps = {
  numUniqueTweets: number;
  numTotalDeletedTweets: number;
  tweetStatusQueueLength: number;
  archiveQueueLength: number;
  numMissedTweetStati: number;
  numStatusResponses: number;
  numArchiveResponses: number;
  handle: string;
  handleSettingsClick: () => void;
  handleRefetchClick: () => void;
};

function StickyFooter({
  numUniqueTweets,
  numTotalDeletedTweets,
  tweetStatusQueueLength,
  archiveQueueLength,
  numMissedTweetStati,
  numStatusResponses,
  numArchiveResponses,
  handle,
  handleSettingsClick,
  handleRefetchClick,
}: StickyFooterProps) {
  return (
    <div className="fixed bottom-0 left-1/2 h-12 w-full -translate-x-1/2 rounded-md bg-gray-800 px-2 text-gray-100 lg:px-0">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <Tooltip text={"Active Account"} color="gray-600">
            <div className="whitespace-nowrap bg-gradient-to-r from-emerald-200 to-rose-200 bg-clip-text text-lg font-bold text-transparent">
              @{handle}
            </div>
          </Tooltip>
          <div className="h-12 border-r-2 border-r-gray-500"></div>
          <Tooltip text={"Unique Archived Tweets"} color="gray-600">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <ArchiveBoxIcon className="h-5 w-5" />
              <div>
                <span className="font-semibold text-emerald-200">
                  {numUniqueTweets}
                </span>
              </div>
            </div>
          </Tooltip>
          <div className="h-12 border-r-2 border-r-gray-500"></div>
          <Tooltip text={"Deleted Tweets (so far)"} color="gray-600">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <XMarkIcon className="h-6 w-6" />
                <span className="font-semibold text-rose-100">
                  {numTotalDeletedTweets}
                </span>
              </div>
            </div>
          </Tooltip>
          <div className="h-12 border-r-2 border-r-gray-500"></div>
          <Tooltip text={"Missed Tweets"} color="gray-600">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <SignalSlashIcon className="h-5 w-5" />
                <span className="font-semibold text-gray-200">
                  {numMissedTweetStati}
                </span>
                {numMissedTweetStati > 0 && (
                  <GrayButton handleClick={handleRefetchClick}>
                    <ArrowPathIcon className="h-4 w-4" />
                  </GrayButton>
                )}
              </div>
            </div>
          </Tooltip>
          <div className="h-12 border-r-2 border-r-gray-500"></div>
          <Tooltip text={"Twitter Status Queue"} color="gray-600">
            <div className="flex items-center gap-3">
              {tweetStatusQueueLength > 0 && (
                <div className="w-5">
                  <LoadingSpin />
                </div>
              )}
              <div className="flex flex-col text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-gray-300">
                      {tweetStatusQueueLength}
                    </span>{" "}
                    <span className="text-xs">in queue</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-300">{numStatusResponses}</span>{" "}
                  <span className="text-xs">responses</span>
                </div>
              </div>
            </div>
          </Tooltip>
          <div className="h-12 border-r-2 border-r-gray-700"></div>
          <Tooltip text={"Archive Queue"} color="gray-600">
            <div className="flex items-center gap-3">
              {archiveQueueLength > 0 && (
                <div className="w-5">
                  <LoadingSpin />
                </div>
              )}
              <div className="flex flex-col text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-gray-300">{archiveQueueLength}</span>{" "}
                    <span className="text-xs">in queue</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-300">{numArchiveResponses}</span>{" "}
                  <span className="text-xs">responses</span>
                </div>
              </div>
            </div>
          </Tooltip>
        </div>
        <div className="flex flex-row gap-3 text-sm"></div>
        <div className="flex items-center">
          <div>
            <GrayButton handleClick={handleSettingsClick}>
              <div className="mt-[1px] w-5">
                <Cog6ToothIcon />
              </div>
              <div>Settings</div>
            </GrayButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyFooter;
