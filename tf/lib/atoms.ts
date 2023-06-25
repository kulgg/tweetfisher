import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const twitterTpsAtom = atomWithStorage("tweetfisher.twitterTps", 1.2);
export const archiveTpsAtom = atomWithStorage("tweetfisher.archiveTps", 3.0);
