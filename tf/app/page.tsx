import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import SiteHeader from "./site-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <div>
        <h1 className="my-4 mr-auto bg-gradient-to-br from-slate-900 to-stone-500 dark:from-white dark:to-stone-300 bg-clip-text text-center text-[39px] font-bold text-transparent sm:my-10 sm:text-6xl">
          Find Deleted Tweets
        </h1>
        <Label htmlFor="handleInput">Enter a username</Label>
        <Input
          id="handleInput"
          placeholder="elonmusk"
          className="dark:border-slate-700 text-base"
        />
      </div>
    </main>
  );
}
