export class MembershipEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly orgId: string,
    private isBanned: boolean,
    public readonly joinedAt: Date
  ) { }

  ban() {
    if (!this.isBanned) return
    return this.isBanned = true
  }

  unban() {
    if (this.isBanned) return
    return this.isBanned = false
  }
}
