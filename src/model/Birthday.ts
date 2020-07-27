export class User {
  constructor(
    private id:string,
    private birthday:string,
  ){}

  public getId(): string {
    return this.id
  }

  public getBirthday(): string {
    return this.birthday
  } 
}