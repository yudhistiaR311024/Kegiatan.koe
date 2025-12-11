import { z } from "zod";

export const userRoleEnum = z.enum(["ADMIN", "MEMBER", "FAKULTAS"]);

export type UserRoleEnumType = z.infer<typeof userRoleEnum>;
