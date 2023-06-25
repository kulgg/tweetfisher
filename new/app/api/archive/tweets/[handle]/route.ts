import { getArchiveUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = 5;

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { handle: string };
  }
) {
  const handle = params.handle;

  if (!handle) {
    return NextResponse.json("No username", { status: 400 });
  }

  try {
    const res = await fetch(getArchiveUrl(handle), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1; https://duckduckgo.com/duckduckbot)",
      },
      method: "head",
    });

    const text = await res.text();
    const lines = text.split("\n");

    const data = lines
      .map((line: string) => line.split(" "))
      .map((x: string[]) => ({ archiveDate: x[1]!, url: x[2]! }))
      .filter((x: any) => x.archiveDate !== undefined && x.url !== undefined);

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(err.response.statusText, {
      status: err.response.status,
    });
  }
}
