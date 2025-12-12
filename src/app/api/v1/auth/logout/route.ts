import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/core/infrastructure/databases/prisma/prisma.client";

//ugly

export async function DELETE(req: NextRequest, res: NextResponse) {
  const storeCookies = await cookies();
  const refreshToken = storeCookies.get("refreshToken")?.value;

  if (!refreshToken)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const userToken = await prisma.refreshToken.findMany({
    where: {
      token: refreshToken,
    },
  });

  if (!userToken[0])
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await prisma.refreshToken.update({
    where: {
      id: userToken[0].id,
    },
    data: {
      token: "",
    },
  });

  storeCookies.delete("refreshToken");
  return NextResponse.json({ message: "Ok" }, { status: 200 });
}
