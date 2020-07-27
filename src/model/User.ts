export class User {
  constructor(
    private id:string,
    private email:string,
  ){}

  public getId(): string {
    return this.id
  }

  public getEmail(): string {
    return this.email
  } 
}