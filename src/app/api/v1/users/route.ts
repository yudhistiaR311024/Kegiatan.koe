import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const dump = {
    username: "junai",
    email: " dina",
  };

  return NextResponse.json(dump, { status: 200 });
}
