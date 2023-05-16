import StatusBar from "@/components/StatusBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="p-10 min-h-screen">
      <div className="max-w-[670px] mx-auto">
        <h1 className="my-4 bg-gradient-to-br from-slate-900 to-stone-500 dark:from-white dark:to-stone-300 bg-clip-text text-[39px] font-bold text-transparent sm:my-10 sm:text-5xl">
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
        <StatusBar />
      </div>
    </main>
  );
}
