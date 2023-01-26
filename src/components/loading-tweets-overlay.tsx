import React from "react";
import LoadingSpin from "./loading-spin";

export type LoadingTweetsOverlayProps = {
  numLoaded: number;
  total: number;
};

function LoadingTweetsOverlay({ numLoaded, total }: LoadingTweetsOverlayProps) {
  return (
    <div className="fixed bottom-0 left-1/2 mb-6 h-10 w-[210px] -translate-x-1/2 rounded-md bg-gray-800 py-2 text-gray-100">
      <div className="flex w-full items-center justify-center gap-4">
        <LoadingSpin />
        <div className="flex items-center gap-2">
          <span className="text-rose-100">
            {numLoaded}/{total}
          </span>
          <div className="text-sm">Deleted Tweets</div>
        </div>
      </div>
    </div>
  );
}

export default LoadingTweetsOverlay;
