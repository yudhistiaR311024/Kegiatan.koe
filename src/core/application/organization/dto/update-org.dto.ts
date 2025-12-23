import { z } from 'zod'
import { slugify } from '@/core/helpers/slugify'

export const updateOrganizationDto = z
  .object({
    name: z.string().min(3, 'Name terlalu pendek').max(50, 'Nama terlalu panjang').optional(),
    imageUrl: z.url().optional(),
    max_member: z.number().min(1).optional(),
    member_count: z.number().optional(),
    invitation_pending: z.number().optional()
  })
  .transform((data) => ({
    ...data,
    ...(data.name && {
      slug: slugify(data.name)
    })
  }));


export type UpdateOrganizationDtoType = z.infer<typeof updateOrganizationDto>
