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
    params: { handle: string };
  }
) {
  const handle = params.handle;

  try {
    const res = await axios.get(`https://twitter.com/${handle}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1; https://duckduckgo.com/duckduckbot)",
      },
      // proxy: proxySettings,
    });

    const html = res.data;

    if (html.search(/Account suspended<\/span>/) !== -1) {
      return NextResponse.json({ accountType: "suspended" });
    }

    return NextResponse.json({ accountType: "active" });
  } catch (err: any) {
    if (err.response.status === 404) {
      return NextResponse.json({ accountType: "notfound" });
    }
    return NextResponse.json("Server Error", { status: 500 });
  }
}