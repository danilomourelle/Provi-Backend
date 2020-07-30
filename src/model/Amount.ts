export class Amount {
  constructor(
    private id: string,
    private amount: string,
    private updateAt: number,
    private userId: string
  ) { }

  public getId(): string {
    return this.id
  }

  public getAmount(): string {
    return this.amount
  }

  public getUpdateAt(): number {
    return this.updateAt
  }

  public getUserId(): string {
    return this.userId
  }
}