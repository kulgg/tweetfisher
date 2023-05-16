import { proxySettings } from "@/lib/constants";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

// if (result.status === 404) {
//   return res.status(200).json({ accountType: "notfound" });
// }

// if (html.search(/Account suspended<\/span>/) !== -1) {
//   return res.status(200).json({ accountType: "suspended" });
// }

// return res.status(200).json({ accountType: "active" });

export async function GET(
  request: Request,
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
