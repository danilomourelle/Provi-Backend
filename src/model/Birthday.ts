export class Birthday {
  constructor(
    private id:string,
    private birthday:string,
    private updateAt: number,
    private userId: string
  ){}

  public getId(): string {
    return this.id
  }

  public getBirthday(): string {
    return this.birthday
  }

  public getUpdateAt():number{
    return this.updateAt
  }

  public getUserId(): string{
    return this.userId
  }
}