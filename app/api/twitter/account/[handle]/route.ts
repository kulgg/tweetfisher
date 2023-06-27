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

  const res = await fetch(`https://twitter.com/${handle}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1; https://duckduckgo.com/duckduckbot)",
    },
  });

  const html = await res.text();

  if (html.search(/Account suspended<\/span>/) !== -1) {
    return NextResponse.json({ accountType: "suspended" });
  }

  if (res.status === 404) {
    return NextResponse.json({ accountType: "notfound" });
  }

  return NextResponse.json({ accountType: "active" });
}
