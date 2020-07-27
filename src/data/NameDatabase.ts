import { BaseDatabase } from "./BaseDatabase";
import { Name } from "../model/Name";

export class NameDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'Product'

  private toModel(dbModel?: any): Name | undefined {
    return (
      dbModel &&
      new Name(
        dbModel.id,
        dbModel.first_name,
        dbModel.last_name,
        dbModel.update_at
      )
    )
  }

  
  public async getNameByValue(value: string): Promise<Name | undefined> {
    const result = await super.getConnection()
    .select("*")
    .from(NameDatabase.TABLE_NAME)
    .where({first_name: value})
    .orWhere({last_name: value})

    return this.toModel(result[0])
  }

  public async getNameByUserId(id: string): Promise<Name | undefined>{
    const result = await super.getConnection()
    .select("*")
    .from(NameDatabase.TABLE_NAME)
    .where({user_id: id})

    return this.toModel(result[0])
  }
}