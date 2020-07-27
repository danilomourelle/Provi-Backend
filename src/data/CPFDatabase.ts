import { BaseDatabase } from "./BaseDatabase";
import { CPF } from "../model/CPF";

export class CPFDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'CPF'

  private toModel(dbModel?: any): CPF | undefined {
    return (
      dbModel &&
      new CPF(
        dbModel.id,
        dbModel.cpf,
        dbModel.update_at,
      )
    )
  }
  
  public async getCPFByValue(value: string): Promise<CPF | undefined> {
    const result = await super.getConnection()
    .select("*")
    .from(CPFDatabase.TABLE_NAME)
    .where({cpf: value})

    return this.toModel(result[0])
  }

  public async getCPFByUserId(id: string): Promise<CPF | undefined>{
    const result = await super.getConnection()
    .select("*")
    .from(CPFDatabase.TABLE_NAME)
    .where({user_id: id})

    return this.toModel(result[0])
  }
}