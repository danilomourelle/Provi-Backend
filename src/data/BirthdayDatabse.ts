import { BaseDatabase } from "./BaseDatabase";
import { Birthday } from "../model/Birthday";

export class BirthdayDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'Birthday'

  private toModel(dbModel?: any): Birthday | undefined {
    return (
      dbModel &&
      new Birthday(
        dbModel.id,
        dbModel.birthday,
        dbModel.update_at,
      )
    )
  }
  
  public async getBirthdayByValue(value: string): Promise<Birthday | undefined> {
    const result = await super.getConnection()
    .select("*")
    .from(BirthdayDatabase.TABLE_NAME)
    .where({birthday: value})

    return this.toModel(result[0])
  }

  public async getBirthdayByUserId(id: string): Promise<Birthday | undefined>{
    const result = await super.getConnection()
    .select("*")
    .from(BirthdayDatabase.TABLE_NAME)
    .where({user_id: id})

    return this.toModel(result[0])
  }
}