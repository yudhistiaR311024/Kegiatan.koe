export type OrganizationEntity = {
  id: string;
  name: string,
  slug: string,
  imageUrl: string | null,
  max_member: number | null,
  member_count: number | null,
  invitation_pending: number | null,
  createdAt: Date;
  updatedAt: Date;
};
