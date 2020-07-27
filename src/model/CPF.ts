export class User {
  constructor(
    private id:string,
    private cpf:string,
  ){}

  public getId(): string {
    return this.id
  }

  public getCPF(): string {
    return this.cpf
  } 
}