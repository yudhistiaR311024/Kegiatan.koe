import { NextResponse } from "next/server";

export async function GET() {
  const dump = {
    username: "junai",
    email: " dina",
  };

  return NextResponse.json(dump, { status: 200 });
}
