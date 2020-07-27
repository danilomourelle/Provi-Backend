export class Name {
  constructor(
    private id:string,
    private firstName:string,
    private updateAt: number,
    private lastName: string,
  ){}

  public getId(): string {
    return this.id
  }

  public getFirstName(): string {
    return this.firstName
  } 

  public getLastName(): string {
    return this.firstName
  } 

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  } 

  public getUpdateAt():number{
    return this.updateAt
  }
}