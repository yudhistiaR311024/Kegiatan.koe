import { z } from 'zod'
import { slugify } from '@/core/helpers/slugify'

export const createOrganizationDto = z.object({
  name: z.string().min(3, 'Nama terlalu pendek').max(50, 'Nama terlalu panjang'),
  imageUrl: z.string().optional(),
  max_member: z.number().default(5).optional(),
  member_count: z.number().default(0).optional(),
  invitation_pending: z.number().default(0).optional()
}).transform(data => ({
  ...data,
  slug: slugify(data.name),
}))

export type CreateOrganizationDtoType = z.infer<typeof createOrganizationDto>
