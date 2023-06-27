import InputForm from "./InputForm";

export default function Home() {
  const a = {
    archiveDate: "20220219175519",
    url: "https://twitter.com/EmmanuelMacron/status/1669706710489899009",
  };

  return (
    <main className="mt-5 pt-32 p-10 min-h-screen">
      <div className="max-w-[670px] mx-auto">
        <h1 className="my-4 bg-gradient-to-br from-slate-900 to-stone-500 dark:from-white dark:to-stone-300 bg-clip-text text-[39px] font-bold text-transparent sm:my-10 sm:text-5xl">
          Find Deleted Tweets
        </h1>
        <div className="my-4"></div>
        <InputForm />
      </div>
    </main>
  );
}
