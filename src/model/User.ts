export class User {
  constructor(
    private id:string,
    private email:string,
    private hash: string,
  ){}

  public getId(): string {
    return this.id
  }

  public getEmail(): string {
    return this.email
  }

  public getHash(): string {
    return this.hash
  }
}