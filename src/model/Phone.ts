export class Phone {
  constructor(
    private id: string,
    private phone: string,
    private updateAt: number,
    private userId: string
  ) { }

  public getId(): string {
    return this.id
  }

  public getPhoneNumber(): string {
    return this.phone
  }

  public getUpdateAt(): number {
    return this.updateAt
  }

  public getUserId(): string {
    return this.userId
  }
}