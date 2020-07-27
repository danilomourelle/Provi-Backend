export class CPF {
  constructor(
    private id:string,
    private cpf:string,
    private updateAt: number
  ){}

  public getId(): string {
    return this.id
  }

  public getCPF(): string {
    return this.cpf
  } 

  public getUpdateAt():number{
    return this.updateAt
  }
}