import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import useScroll from "../lib/hooks/use-scroll";

export type StickyHeaderProps = {
  numFetched: number;
  numTotal: number;
  numMissed: number;
};

function StickyHeader({ numFetched, numTotal, numMissed }: StickyHeaderProps) {
  return (
    <div className="sticky top-0 z-50 w-full bg-gray-800 py-3 px-1 sm:px-0">
      <div className="container mx-auto">
        <div className="flex items-center gap-3">
          <h2 className="whitespace-nowrap bg-gradient-to-r from-emerald-200 to-rose-200 bg-clip-text text-base font-bold text-transparent sm:w-64 sm:text-base">
            Fetching Status
          </h2>
          <ProgressBar
            completed={numFetched}
            maxCompleted={numTotal}
            className="w-full grow rounded-full border border-gray-400"
            bgColor="#a7f3d0"
            baseBgColor="#374151"
            isLabelVisible={false}
          />
          <div className="flex items-center gap-4 whitespace-nowrap">
            <span className="text-gray-300">
              {numFetched} / {numTotal}
            </span>
            {numMissed > 0 && (
              <span className="text-sm text-red-200">({numMissed} missed)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyHeader;
