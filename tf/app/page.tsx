import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SettingsDialog } from "./SettingsDialog";

export default function Home() {
  return (
    <main className="p-10 min-h-screen">
      <div className="max-w-[670px] mx-auto">
        <h1 className="my-4 bg-gradient-to-br from-slate-900 to-stone-500 dark:from-white dark:to-stone-400 bg-clip-text text-[39px] font-bold text-transparent sm:my-10 sm:text-6xl text-center">
          Find Deleted Tweets
        </h1>
        <div className="my-4"></div>
        <div className="w-full">
          <Label htmlFor="handleInput" className="text-lg">
            Enter a username
          </Label>
          <div className="mt-1"></div>
          <Input
            id="handleInput"
            placeholder="elonmusk"
            className="dark:border-slate-700 text-lg h-12"
          />
        </div>
      </div>
      <footer className="fixed bottom-0 left-1/2 h-12 w-full -translate-x-1/2 bg-slate-100 dark:bg-gray-800 px-2 text-slate-800 dark:text-gray-100 lg:px-0">
        <div className="flex w-full items-center justify-between container">
          <div className="flex items-center gap-3">
            <div className="whitespace-nowrap bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-lg font-bold text-transparent">
              @handle
            </div>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Icons.laptop className="h-5 w-5" />
              <div>
                <span className="font-semibold text-emerald-400 dark:text-emerald-200">
                  {0}
                </span>
              </div>
            </div>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Icons.close className="h-6 w-6" />
                <span className="font-semibold text-rose-400 dark:text-rose-100">
                  {0}
                </span>
              </div>
            </div>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Icons.apple className="h-5 w-5" />
                <span className="font-semibold dark:text-gray-200 text-gray-500">
                  {0}
                </span>
                {
                  0 > 0 && null
                  // <GrayButton handleClick={handleRefetchClick}>
                  //   <ArrowPathIcon className="h-4 w-4" />
                  // </GrayButton>
                }
              </div>
              <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
              <div className="flex items-center gap-3">
                {0 > 0 && <div className="w-5">Loading...</div>}
                <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">
                        {0}
                      </span>{" "}
                      <span className="text-xs">in queue</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">
                      {0}
                    </span>{" "}
                    <span className="text-xs">responses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SettingsDialog />
        </div>
      </footer>
    </main>
  );
}
