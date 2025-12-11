import { NextResponse } from "next/server";
import { AppError } from "@/core/domain/errors/AppError";
import { ZodError } from "zod";

export function handleApiError(error: any): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation failed",
        errors: error.issues,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    { status: 500 }
  );
}
