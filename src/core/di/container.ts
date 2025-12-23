//FIXME: akan di ganti kemudian
import { AuthService } from "../application/auth/services/AuthService";
import { UserService } from "../application/user/services/UserService";
import { OrganizationService } from "../application/organization/service/organization.service";

//PrismaORM
import { prisma } from "../infrastructure/databases/prisma/prisma.client";
import { PrismaUserRepository } from "../infrastructure/repositories/PrismaUserRepository";
import { PrismaAuthRepository } from "../infrastructure/repositories/PrismaAuthRepository";
import { PrismaOrganizationRepository } from "../infrastructure/repositories/PrismaOrgReposiotry";

//Repositories
const prismaUserRepository = new PrismaUserRepository(prisma.user);
const prismaAuthrepository = new PrismaAuthRepository(prisma.user);
const prismaOrganizationRepository = new PrismaOrganizationRepository(prisma.organization)

//Services
const userService = new UserService(prismaUserRepository);
const authService = new AuthService(prismaAuthrepository, prismaUserRepository);
const organizationService = new OrganizationService(prismaOrganizationRepository)

export { userService, authService, organizationService };
