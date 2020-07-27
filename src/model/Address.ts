export class User {
  constructor(
    private id:string,
    private cep:string,
    private street: string,
    private number: number,
    private complement: string,
    private city: string,
    private state: string
  ){}

  public getId(): string {
    return this.id
  }

  public getCEP(): string {
    return this.cep
  } 

  public getStreet(): string {
    return this.street
  }

  public getNumber(): number {
    return this.number
  }

  public getComplement(): string{
    return this.complement
  }

  public getCity(): string{
    return this.city
  }

  public getState(): string{
    return this.state
  }
}