import "dotenv/config";
import { logger } from "../../logger/logger";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: Number(process.env.DATABASE_PORT),
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({
  adapter,
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
    {
      emit: "event",
      level: "error",
    },
  ],
});

prisma.$on("query", (e) => {
  logger.info(`
      query : ${e.query}\n
      params : ${JSON.stringify(e.params)}\n
      duration : ${e.duration}ms\n
    `);
});

prisma.$on("warn", (e) => {
  logger.warn(`Warn: ${e.message}`);
});

prisma.$on("error", (e) => {
  logger.error(`Error: ${e.message}`);
});

export { prisma };
