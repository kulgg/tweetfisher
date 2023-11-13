import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = 5;

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { url: string };
  }
) {
  const url = params.url;

  if (!url || Array.isArray(url)) {
    return NextResponse.json("No URL", { status: 400 });
  }

  if (!url.startsWith("https://twitter.com/")) {
    return NextResponse.json("Bad URL", { status: 404 });
  }
  console.log(url);

  const result = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1; https://duckduckgo.com/duckduckbot)",
    },
    method: "GET",
  });

  if (!result) {
    return NextResponse.json("Server error", { status: 500 });
  }

  const html = await result.text();

  if (html.search("Something went wrong. Try reloading.") !== -1) {
    return NextResponse.json("Not found", { status: 404 });
  }

  return NextResponse.json(result.statusText, { status: result.status });
}
