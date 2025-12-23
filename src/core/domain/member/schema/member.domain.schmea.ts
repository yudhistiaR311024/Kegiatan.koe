import { z } from 'zod'

export const MemberDomainSchema = z.object({
  userId: z.string(),
  orgId: z.string(),
  isBanned: z.boolean(),
  joinedAt: z.date(),
})
