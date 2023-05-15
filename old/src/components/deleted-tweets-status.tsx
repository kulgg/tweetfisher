import LoadingSpin from "./loading-spin";

export type LoadingTweetsOverlayProps = {
  num: number;
};

function DeletedTweetsStatus({ num }: LoadingTweetsOverlayProps) {
  return (
    <div>
      <div className="flex w-full items-center justify-center gap-2">
        <div className="w-6">
          <LoadingSpin />
        </div>
        <div className="flex items-center gap-2">
          <div>{num}</div>
          <div className="whitespace-nowrap">Deleted Tweets</div>
        </div>
      </div>
    </div>
  );
}

export default DeletedTweetsStatus;
