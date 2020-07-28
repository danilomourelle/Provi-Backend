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
        dbModel.user_id
      )
    )
  }

  public async create(cpf: CPF): Promise<void> {
    await this.getConnection()
      .insert({
        id: cpf.getId(),
        cpf: cpf.getCPF(),
        update_at: cpf.getUpdateAt(),
        user_id: cpf.getUserId()
      })
      .into(CPFDatabase.TABLE_NAME)
  }

  public async update(newDate: number, cpfId: string): Promise<void> {
    await this.getConnection()
      .update({
        update_at: newDate
      })
      .into(CPFDatabase.TABLE_NAME)
      .where({id: cpfId})
  }
  
  public async getCPFByValue(cpf: CPF): Promise<CPF | undefined> {
    const result = await super.getConnection()
    .select("*")
    .from(CPFDatabase.TABLE_NAME)
    .where({cpf: cpf.getCPF()})

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