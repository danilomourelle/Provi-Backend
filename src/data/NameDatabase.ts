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
}