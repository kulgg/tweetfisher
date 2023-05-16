import StatusBar from "@/components/StatusBar";
import { useRouter } from "next/navigation";

async function SearchLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { handle: string };
}) {
  const { handle } = params;

  return (
    <div>
      <div>{children}</div>
      <StatusBar handle={handle} />
    </div>
  );
}

export default SearchLayout;
