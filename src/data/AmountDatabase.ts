import { BaseDatabase } from "./BaseDatabase";
import { Amount } from "../model/Amount";

export class AmountDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'Amount'

  private toModel(dbModel?: any): Amount | undefined {
    return (
      dbModel &&
      new Amount(
        dbModel.id,
        dbModel.amount,
        dbModel.update_at,
        dbModel.user_id
      )
    )
  }

  public async create(amount: Amount): Promise<void> {
    await this.getConnection()
      .insert({
        id: amount.getId(),
        amount: amount.getAmount(),
        update_at: amount.getUpdateAt(),
        user_id: amount.getUserId()
      })
      .into(AmountDatabase.TABLE_NAME)
  }

  public async update(newDate: number, amountId: string): Promise<void> {
    await this.getConnection()
      .update({
        update_at: newDate
      })
      .into(AmountDatabase.TABLE_NAME)
      .where({ id: amountId })
  }

  public async getAmountByValue(amount: Amount): Promise<Amount | undefined> {
    const result = await super.getConnection()
      .select("*")
      .from(AmountDatabase.TABLE_NAME)
      .where({ amount: amount.getAmount() })

    return this.toModel(result[0])
  }

  public async getAmountByUserId(id: string): Promise<Amount | undefined> {
    const result = await super.getConnection()
      .select("*")
      .from(AmountDatabase.TABLE_NAME)
      .where({ user_id: id })

    return this.toModel(result[0])
  }
}