import React from "react";
import LoadingSpin from "./loading-spin";

export type LoadingTweetsOverlayProps = {
  numLoaded: number;
  total: number;
};

function DeletedTweetsStatus({ numLoaded, total }: LoadingTweetsOverlayProps) {
  return (
    <div>
      {numLoaded < total && (
        <div className="flex w-full items-center justify-center gap-2">
          <div className="w-6">
            <LoadingSpin />
          </div>
          <div className="flex items-center gap-2">
            <div>
              {numLoaded}/<span className="text-rose-100">{total}</span>
            </div>
            <div className="whitespace-nowrap">Deleted Tweets</div>
          </div>
        </div>
      )}
      {numLoaded === total && (
        <div className="flex w-full items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-rose-100">{numLoaded}</span>
            <div className="whitespace-nowrap text-gray-200">
              Deleted Tweets
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeletedTweetsStatus;
