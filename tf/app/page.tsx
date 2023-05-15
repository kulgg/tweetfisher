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
        <div className="my-2"></div>
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
            <div>jojo</div>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <div>jojo</div>
            <div className="h-12 border-r-2 dark:border-r-gray-500 border-r-gray-300"></div>
            <div>jojo</div>
          </div>
          <SettingsDialog />
        </div>
      </footer>
    </main>
  );
}
