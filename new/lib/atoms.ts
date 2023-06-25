import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const twitterTpsAtom = atomWithStorage("tweetfisher.twitterTps", 1.2);
const archiveTpsAtom = atomWithStorage("tweetfisher.archiveTps", 3.0);

const accountStatusAtom = atom("");

export { twitterTpsAtom, archiveTpsAtom, accountStatusAtom };
