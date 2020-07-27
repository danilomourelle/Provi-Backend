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
}