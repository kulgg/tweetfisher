import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ITweetMap } from "./filter";
import { DeletedTweet } from "./types";

const twitterTpsAtom = atomWithStorage("tweetfisher.twitterTps", 1.2);
const archiveTpsAtom = atomWithStorage("tweetfisher.archiveTps", 3.0);

const accountStatusAtom = atom("");
const archivedTweetsAtom = atom<ITweetMap>({});
const numUniqueArchivedTweetsAtom = atom((get) => {
  return Object.keys(get(archivedTweetsAtom)).length;
});
const twitterStatusQueueAtom = atom<DeletedTweet[][]>([]);

export {
  twitterTpsAtom,
  archiveTpsAtom,
  accountStatusAtom,
  archivedTweetsAtom,
  numUniqueArchivedTweetsAtom,
  twitterStatusQueueAtom,
};
