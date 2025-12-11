import { AuthService } from "../application/auth/services/AuthService";
import { UserService } from "../application/user/services/UserService";

//PrismaORM
import { prisma } from "../infrastructure/databases/prisma/prisma.client";
import { PrismaUserRepository } from "../infrastructure/repositories/PrismaUserRepository";
import { PrismaAuthRepository } from "../infrastructure/repositories/PrismaAuthRepository";

//Repositories
const prismaUserRepository = new PrismaUserRepository(prisma.user);
const prismaAuthrepository = new PrismaAuthRepository(prisma.user);

//Services
const userService = new UserService(prismaUserRepository);
const authService = new AuthService(prismaAuthrepository, prismaUserRepository);

export { userService, authService };
