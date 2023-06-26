export type DeletedTweet = {
  archiveDate: string;
  url: string;
  statusId: string;
};

export type FullDeletedTweet = {
  tweet: string;
  username: string;
  date: string;
  avatarUrl: string;
  url: string;
  handle: string;
  replyTo: string | null;
  imageUrls: string[];
};

export type TweetResult =
  | ({ type: "result" } & FullDeletedTweet)
  | { type: "loading" };
