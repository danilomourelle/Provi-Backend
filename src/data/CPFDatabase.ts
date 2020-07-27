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
}