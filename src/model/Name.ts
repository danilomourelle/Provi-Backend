export class Name {
  constructor(
    private id:string,
    private firstName:string,
    private lastName: string,
    private updateAt: number,
    private userId: string,
  ){}

  public getId(): string {
    return this.id
  }

  public getFirstName(): string {
    return this.firstName
  } 

  public getLastName(): string {
    return this.lastName
  } 

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  } 

  public getUpdateAt():number{
    return this.updateAt
  }
  
  public getUserId():string{
    return this.userId
  }
}