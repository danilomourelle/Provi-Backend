import { CPFDatabase } from "../data/CPFDatabase";
import { IdManager } from "../services/IdManager";
import { CPF } from "../model/CPF";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";
import { InvalidParameterError } from "../errors/InvalidParameterError";

export class CPFBusiness {
  constructor(
    private cpfDatabase: CPFDatabase,
    private idManager: IdManager
  ) { }

  public async insert(cpf: string, userId:string): Promise<void>{
    const id = this.idManager.generateId()

    const newCPF = new CPF(
      id,
      cpf,
      Date.now(),
      userId
    )
    if(!newCPF.isValid()){
      throw new InvalidParameterError("Número de CPF inválido")
    }
    const existingCPF = await this.cpfDatabase.getCPFByValue(newCPF)

    if (existingCPF && existingCPF.getUserId() === userId) {
      await this.cpfDatabase.update(Date.now(), existingCPF.getId())
    }
    else if (existingCPF && existingCPF.getUserId() !== userId) {
      throw new DataAlreadyInUser("CPF utilizado em outro usuário")
    }
    else {
      await this.cpfDatabase.create(newCPF)
    }
  }
}
