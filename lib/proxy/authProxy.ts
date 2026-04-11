import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prefix } from "@/app/utils/prefix";

export function checkAuthSession(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // ข้ามการเช็คพวกนี้
  if (pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js)$/)) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/api") || pathname.includes("/api/")) {
    return NextResponse.next();
  }
  // เช็คแค่ว่ามีคุกกี้ connect.sid อยู่ในเครื่องไหม
  const hasSession = request.cookies.has("connect.sid");
  const loginRoute = `/login`;
  const isLoginRoute = pathname === loginRoute;
  const isProtectedRoute = pathname.startsWith(`/`);

  console.log(`Proxying: ${pathname} | Session: ${hasSession}`);

  // เข้าหน้าหวงห้าม แต่ไม่มี Session -> ไปหน้า Login
  if (isProtectedRoute && !isLoginRoute && !hasSession) {
    return NextResponse.redirect(
      new URL(`${prefix}${loginRoute}`, request.url),
    );
  }
  return NextResponse.next();
}
