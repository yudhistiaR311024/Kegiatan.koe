import {
  AppError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "@/core/domain/errors/AppError";
import { logger } from "@/core/infrastructure/logger/logger";

export async function handlePrismaError<T>(fn: Promise<T>): Promise<T> {
  try {
    return await fn;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e = error as any;
    logger.error("Prisma Error:", e);

    if (e.code === "P2002") {
      const target = e.meta?.target ? ` (${e.meta.target})` : "";
      throw new ConflictError(`Resource already exists${target}`);
    }

    if (e.code === "P2025" || e.code === "P2001") {
      throw new NotFoundError("Resource not found");
    }

    if (e.code === "P2003") {
      const field = e.meta?.field_name ? ` (${e.meta.field_name})` : "";
      throw new ConflictError(`Foreign key constraint failed${field}`);
    }

    if (e.code === "P2014") {
      throw new ConflictError(
        "The change you are trying to make would violate the required relation between records"
      );
    }

    if (["P2000", "P2005", "P2006", "P2011", "P2012"].includes(e.code)) {
      throw new ValidationError("Invalid data input or constraint violation");
    }

    if (e.code === "P2024") {
      throw new AppError("Database connection timed out", 503);
    }

    if (e.code === "P2010" || e.code === "P2021") {
      throw new AppError("Database configuration error", 500);
    }

    throw new AppError("Database operation failed", 500);
  }
}
