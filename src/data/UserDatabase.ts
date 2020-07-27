import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class ProductDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'Product'

  private toModel(dbModel?: any): User | undefined {
    return (
      dbModel &&
      new User(
        dbModel.id,
        dbModel.email,
        dbModel.password,
      )
    )
  }
}