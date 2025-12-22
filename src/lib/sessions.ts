import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/core/infrastructure/databases/prisma/prisma.client";

type SessionPayload = {
  userId: string;
  username: string;
  email: string;
  role: string;
};

const refreshTokenKey = process.env.REFRESH_TOKEN_SECRET;
const accessTokenKey = process.env.ACCESS_TOKEN_SECRET;

if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error("REFRESH_TOKEN_SECRET is not defined");
}

if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET is not defined");
}

const encodedRefreshTokenKey = new TextEncoder().encode(refreshTokenKey);
const encodedAccessTokenKey = new TextEncoder().encode(accessTokenKey);

export async function refreshTokenEncoded(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedRefreshTokenKey);
}

export async function accessTokenEncoded(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(encodedAccessTokenKey);
}

export async function decodedRefreshToken(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedRefreshTokenKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
  }
}

export async function decodedAccessToken(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedAccessTokenKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
  }
}

export async function createRefreshToken(payload: SessionPayload) {
  const expiresAt: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const refreshToken = await refreshTokenEncoded(payload);
  const cookieStore = await cookies();

  try {
    await prisma.refreshToken.update({
      where: {
        userId: payload.userId,
      },
      data: {
        token: refreshToken,
      },
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  } catch (error) {
    console.log(error)
  }
}

export async function createAccessToken(payload: SessionPayload) {
  const expiresAt: Date = new Date(Date.now() + 15 * 60 * 60 * 1000);
  const accessToken = await accessTokenEncoded({
    userId: payload.userId,
    username: payload.username,
    email: payload.email,
    role: payload.role,
  });
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function clearRefreshToken() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("refreshToken")?.value;
  if (!token) return { message: "token tidak valid" };
  const decoded = await decodedRefreshToken(token);
  if (!decoded) return { message: "token tidak valid" };

  await prisma.refreshToken.update({
    where: {
      userId: decoded.userId as string,
    },
    data: {
      token: "",
    },
  });

  cookiesStore.delete("refreshToken");
}

export async function getdecodedToken() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("refreshToken")?.value;
  if (!token) return { message: "token tidak valid" };
  const decoded = await decodedRefreshToken(token);
  return decoded
}
