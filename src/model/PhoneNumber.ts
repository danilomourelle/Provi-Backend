export class PhoneNumber {
  constructor(
    private id:string,
    private phoneNumber:string,
    private updateAt: number,
  ){}

  public getId(): string {
    return this.id
  }

  public getPhoneNumber(): string {
    return this.phoneNumber
  } 

  public getUpdateAt():number{
    return this.updateAt
  }
}