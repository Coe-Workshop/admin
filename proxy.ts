import type { NextRequest } from "next/server";
import { checkAuthSession } from "@/lib/proxy/authProxy"; 

export function proxy(request: NextRequest) {
  // console.log("Enter URL:", request.nextUrl.pathname);
  return checkAuthSession(request);
}

export const config = {
  matcher: [
    "/:path*",
  ],
};