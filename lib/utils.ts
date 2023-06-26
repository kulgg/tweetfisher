import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getArchiveUrl = (handle: string) =>
  `https://web.archive.org/cdx/search/cdx?url=twitter.com/${handle}/status&matchType=prefix&filter=!statuscode:302`;
