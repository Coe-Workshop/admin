import type { NextRequest } from "next/server";
import { checkAuthSession } from "@/lib/proxy/authProxy"; 

function shouldEnableProxy() {
  return process.env.PROXY_DISABLE?.toLowerCase() !== "true";
}

export function proxy(request: NextRequest) {
  // console.log("Enter URL:", request.nextUrl.pathname);
  if (shouldEnableProxy()) {
    return checkAuthSession(request);
  }
}

export const config = {
  matcher: [
    "/:path*",
  ],
};