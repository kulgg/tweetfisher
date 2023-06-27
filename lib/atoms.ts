import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ITweetMap } from "./filter";
import { DeletedTweet, FullDeletedTweet, TweetResult } from "./types";

const twitterTpsAtom = atomWithStorage("tweetfisher.twitterTps", 1.2);
const archiveTpsAtom = atomWithStorage("tweetfisher.archiveTps", 3.0);

const accountNameAtom = atom("");
const accountStatusAtom = atom("");
const archivedTweetsAtom = atom<ITweetMap>({});
const numUniqueArchivedTweetsAtom = atom((get) => {
  return Object.keys(get(archivedTweetsAtom)).length;
});
const twitterStatusQueueAtom = atom<DeletedTweet[][]>([]);
const missedTweetsAtom = atom<DeletedTweet[]>([]);
const archiveQueueAtom = atom<DeletedTweet[]>([]);
const deletedTweetsAtom = atom<TweetResult[]>([]);

const numStatusResponsesAtom = atom(0);
const numArchiveResponsesAtom = atom((get) => {
  return get(deletedTweetsAtom).filter((x) => x.type === "result").length;
});

export {
  twitterTpsAtom,
  archiveTpsAtom,
  accountStatusAtom,
  archivedTweetsAtom,
  numUniqueArchivedTweetsAtom,
  twitterStatusQueueAtom,
  archiveQueueAtom,
  deletedTweetsAtom,
  accountNameAtom,
  missedTweetsAtom,
  numStatusResponsesAtom,
  numArchiveResponsesAtom,
};
