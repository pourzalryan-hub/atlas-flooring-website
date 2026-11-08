import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/manageAuth";

// Clears the remember-me cookie.
export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/manage",
    maxAge: 0,
  });
  return res;
}
