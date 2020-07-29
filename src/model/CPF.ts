export class CPF {
  constructor(
    private id: string,
    private cpf: string,
    private updateAt: number,
    private userId: string
  ) { }

  public getId(): string {
    return this.id
  }

  public getCPF(): string {
    return this.cpf
  }

  public getUpdateAt(): number {
    return this.updateAt
  }

  public getUserId(): string {
    return this.userId
  }

  // Formula adaptada de https://www.geradorcpf.com/javascript-validar-cpf.htm / http://www.gerardocumentos.com.br/?pg=entenda-a-formula-do-cpf
  public isValid(): boolean {
    const cpf:string = this.cpf.replace(/[^\d]+/g, '');

    if (cpf.length != 11)
      return false;

    // Valida 1o digito	
    let cont = 0;
    for (let i = 0; i < 9; i++)
      cont += parseInt(cpf.charAt(i)) * (10 - i);
    let firstDigit = 11 - (cont % 11);
    if (firstDigit >= 10) {
      firstDigit = 0;
    }
    if (firstDigit != parseInt(cpf.charAt(9))) {
      return false;
    }

    // Valida 2o digito	
    cont = 0;
    for (let i = 0; i < 10; i++)
      cont += parseInt(cpf.charAt(i)) * (11 - i);
    let secondDigit = 11 - (cont % 11);
    if (secondDigit > 10)
      secondDigit = 0;
    if (secondDigit != parseInt(cpf.charAt(10)))
      return false;

    return true;
  }
}