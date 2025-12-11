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
  } catch (error: any) {
    logger.error("Prisma Error:", error);

    if (error.code === "P2002") {
      const target = error.meta?.target ? ` (${error.meta.target})` : "";
      throw new ConflictError(`Resource already exists${target}`);
    }

    if (error.code === "P2025" || error.code === "P2001") {
      throw new NotFoundError("Resource not found");
    }

    if (error.code === "P2003") {
      const field = error.meta?.field_name ? ` (${error.meta.field_name})` : "";
      throw new ConflictError(`Foreign key constraint failed${field}`);
    }

    if (error.code === "P2014") {
      throw new ConflictError(
        "The change you are trying to make would violate the required relation between records"
      );
    }

    if (["P2000", "P2005", "P2006", "P2011", "P2012"].includes(error.code)) {
      throw new ValidationError("Invalid data input or constraint violation");
    }

    if (error.code === "P2024") {
      throw new AppError("Database connection timed out", 503);
    }

    if (error.code === "P2010" || error.code === "P2021") {
      throw new AppError("Database configuration error", 500);
    }

    throw new AppError("Database operation failed", 500);
  }
}
