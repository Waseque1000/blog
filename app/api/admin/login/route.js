import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Demo credentials — replace with Firebase auth later
const DEMO_EMAIL = "admin@dailyblog.com";
const DEMO_PASSWORD = "admin123";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Check demo credentials
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const sessionToken = Buffer.from(
        JSON.stringify({ email, loginAt: Date.now() })
      ).toString("base64");

      const cookieStore = await cookies();
      cookieStore.set("session", sessionToken, {
        maxAge: 60 * 60 * 24 * 5, // 5 days in seconds
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  } catch (error) {
    console.error("Login Error", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
