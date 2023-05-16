import { proxySettings } from "@/lib/constants";
import axios, { AxiosError } from "axios";
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

  try {
    const res = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1; https://duckduckgo.com/duckduckbot)",
      },
      method: "head",
      // proxy: proxySettings,
    });

    return NextResponse.json(res.statusText, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(err.response.statusText, {
      status: err.response.status,
    });
  }
}
