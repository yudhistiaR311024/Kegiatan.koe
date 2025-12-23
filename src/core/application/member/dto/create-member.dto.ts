import { z } from 'zod'

export const crateMemberDto = z.object({
  userId: z.string(),
  orgId: z.string(),
  isBanned: z.boolean().default(false),
  joinedAt: z.date()
})

export type CreateMemberDtoType = z.infer<typeof crateMemberDto>
