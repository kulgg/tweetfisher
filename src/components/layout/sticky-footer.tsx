import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import DeletedTweetsStatus from "../deleted-tweets-status";
import FetchProgressBar from "../fetch-progress-bar";
import GrayButton from "../ui/buttons/gray-button";

export type StickyFooterProps = {
  numLoadedDeletedTweets: number;
  numTotalDeletedTweets: number;
  numValidTweets: number;
  numFetchedTweetStati: number;
  numMissedTweetStati: number;
  handle: string;
  handleSettingsClick: () => void;
};

function StickyFooter({
  numLoadedDeletedTweets,
  numValidTweets,
  numFetchedTweetStati,
  numTotalDeletedTweets,
  numMissedTweetStati,
  handle,
  handleSettingsClick,
}: StickyFooterProps) {
  return (
    <div className="fixed bottom-0 left-1/2 h-12 w-full -translate-x-1/2 rounded-md bg-gray-800 text-gray-100">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <div className="flex w-full items-center gap-3">
          <div className="whitespace-nowrap bg-gradient-to-r from-emerald-200 to-rose-200 bg-clip-text text-lg font-bold text-transparent">
            @{handle}
          </div>
          <div className="h-12 border-r border-r-gray-300"></div>

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-gray-200">
              {numFetchedTweetStati} /{" "}
              <span className="">
                <span className="font-semibold text-emerald-200">
                  {numValidTweets}
                </span>{" "}
                archived tweets
              </span>
            </span>
            {numMissedTweetStati > 0 && (
              <span className="text-sm text-zinc-300">
                ({numMissedTweetStati} missed)
              </span>
            )}
          </div>
          <div className="h-12 border-r border-r-gray-300"></div>
          <DeletedTweetsStatus
            numLoaded={numLoadedDeletedTweets}
            total={numTotalDeletedTweets}
          />
        </div>
        <GrayButton handleClick={handleSettingsClick}>
          <div className="mt-[1px] w-5">
            <Cog6ToothIcon />
          </div>
          <div>Settings</div>
        </GrayButton>
      </div>
    </div>
  );
}

export default StickyFooter;
