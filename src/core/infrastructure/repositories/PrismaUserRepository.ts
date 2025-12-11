import { Prisma } from "@/generated/prisma/client";
import { IUserRepository } from "@/core/domain/user/repository/user.repository";
import { handlePrismaError } from "../../utils/handlePrismaError";

import type { User } from "@/generated/prisma/client";

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly user: Prisma.UserDelegate) {}

  async findUsername(username: string): Promise<User | null> {
    return handlePrismaError<User>(
      this.user.findUniqueOrThrow({ where: { username } })
    );
  }
  async create(dto: Prisma.UserCreateInput): Promise<User> {
    return handlePrismaError(this.user.create({ data: dto }));
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return handlePrismaError(this.user.update({ where: { id }, data }));
  }

  async delete(id: string): Promise<void> {
    await handlePrismaError(this.user.delete({ where: { id } }));
  }

  async deleteExternalId(id: string): Promise<void> {
    await handlePrismaError(this.user.delete({ where: { externalId: id } }));
  }
}
