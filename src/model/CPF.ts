export class CPF {
  constructor(
    private id:string,
    private cpf:string,
    private updateAt: number,
    private userId: string
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

  public getUserId(): string{
    return this.userId
  }
}