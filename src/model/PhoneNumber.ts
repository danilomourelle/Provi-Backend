export class PhoneNumber {
  constructor(
    private id:string,
    private phoneNumber:string,
  ){}

  public getId(): string {
    return this.id
  }

  public getPhoneNumber(): string {
    return this.phoneNumber
  } 
}