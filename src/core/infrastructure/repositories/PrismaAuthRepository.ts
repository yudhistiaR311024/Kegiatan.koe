import { Prisma } from "@/generated/prisma/client";
import { AuthRepository } from "@/core/domain/auth/repository/auth.repository";
import { handlePrismaError } from "@/core/utils/handlePrismaError";

import type { User } from "@/generated/prisma/client";

export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly user: Prisma.UserDelegate) {}
  async login(identifier: string): Promise<User | null> {
    return await handlePrismaError(
      this.user.findFirst({
        where: {
          OR: [
            {
              username: identifier,
            },
            {
              email: identifier,
            },
          ],
        },
      })
    );
  }

  async register(dto: Prisma.UserCreateInput): Promise<User> {
    return await handlePrismaError(this.user.create({ data: dto }));
  }
}
