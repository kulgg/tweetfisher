import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-10 mt-20 min-h-screen">
      <Skeleton className="w-[670px] h-[300px] bg-slate-100 dark:bg-slate-800" />
      <Skeleton className="w-[670px] h-[300px] bg-slate-100 dark:bg-slate-800" />
      <Skeleton className="w-[670px] h-[300px] bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}
