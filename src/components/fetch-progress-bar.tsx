import ProgressBar from "@ramonak/react-progress-bar";

export type FetchProgressBarProps = {
  numFetched: number;
  numTotal: number;
  numMissed: number;
};

function FetchProgressBar({
  numFetched,
  numTotal,
  numMissed,
}: FetchProgressBarProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <ProgressBar
        completed={numFetched}
        maxCompleted={numTotal}
        className="w-full grow rounded-full border border-gray-400"
        bgColor="#a7f3d0"
        baseBgColor="#374151"
        isLabelVisible={false}
      />
    </div>
  );
}

export default FetchProgressBar;
