export type CreateMemberData = {
  userId: string,
  orgId: string,
  isBanned: boolean,
  joinedAt: Date
}

export type UpdateMemberData = {
  userId?: string,
  orgId?: string,
  isBanned?: boolean,
  joindAt?: Date
}

export type MembershipWithOrg = {
  membershipId: string
  userId: string
  orgId: string
  orgName: string
  orgImage: string,
  joinedAt: Date
  isBanned: boolean
}
