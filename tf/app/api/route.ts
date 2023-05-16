import { proxySettings } from "@/lib/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await axios.get("http://lumtest.com/myip.json", {
    proxy: proxySettings,
  });

  return NextResponse.json({ response: res.data });
}
