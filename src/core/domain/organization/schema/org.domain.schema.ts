import { z } from "zod";
import { MemberDomainSchema } from "../../member/schema/member.domain.schmea";

export const OrganizationDomainSchema = z.object({
  name: z.string(),
  slug: z.string(),
  imageUrl: z.url(),
  max_member: z.number(),
  member_count: z.number(),
  members: z.array(MemberDomainSchema),
  invitation_pending: z.number()
})
