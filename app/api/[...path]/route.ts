import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://dev-coe.ionize13.com/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const url = `${BASE_URL}/${path.join("/")}?${request.nextUrl.searchParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
    credentials: "include",
  });

  const headers = new Headers(response.headers);
  const cookie = headers.get("set-cookie");
  const data = await response.json();

  const nextResponse = NextResponse.json(data, { status: response.status });
  
  if (cookie) {
    nextResponse.headers.set("set-cookie", cookie);
  }

  return nextResponse;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const url = `${BASE_URL}/${path.join("/")}`;

  const body = await request.json();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: request.headers.get("cookie") || "",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const headers = new Headers(response.headers);
  const cookie = headers.get("set-cookie");
  const data = await response.json();

  const nextResponse = NextResponse.json(data, { status: response.status });
  
  if (cookie) {
    nextResponse.headers.set("set-cookie", cookie);
  }

  return nextResponse;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const url = `${BASE_URL}/${path.join("/")}`;

  const body = await request.json();

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      cookie: request.headers.get("cookie") || "",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const headers = new Headers(response.headers);
  const cookie = headers.get("set-cookie");
  const data = await response.json();

  const nextResponse = NextResponse.json(data, { status: response.status });
  
  if (cookie) {
    nextResponse.headers.set("set-cookie", cookie);
  }

  return nextResponse;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const url = `${BASE_URL}/${path.join("/")}?${request.nextUrl.searchParams.toString()}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
    credentials: "include",
  });

  const headers = new Headers(response.headers);
  const cookie = headers.get("set-cookie");
  const data = await response.json();

  const nextResponse = NextResponse.json(data, { status: response.status });
  
  if (cookie) {
    nextResponse.headers.set("set-cookie", cookie);
  }

  return nextResponse;
}
