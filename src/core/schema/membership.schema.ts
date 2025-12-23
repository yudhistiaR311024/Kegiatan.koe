import { z } from 'zod'

export const createMemebrshipSchema = z.object({
  userId: z.uuid(),
  orgId: z.uuid(),
  isBanned: z.boolean().default(false),
  joinedAt: z.date().default(new Date())
})

export const updateMembershipSchema = z.object({
  userId: z.uuid().optional(),
  orgId: z.uuid().optional(),
  isBanned: z.boolean().optional(),
  joinedAt: z.date().optional()
})

export type CreateMembershipSchemaType = z.infer<typeof createMemebrshipSchema>
export type UpdateMembershipSchemaType = z.infer<typeof updateMembershipSchema>

