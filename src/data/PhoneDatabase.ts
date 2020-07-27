import { BaseDatabase } from "./BaseDatabase";
import { PhoneNumber } from "../model/PhoneNumber";

export class PhoneDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'PhoneNumber'

  private toModel(dbModel?: any): PhoneNumber | undefined {
    return (
      dbModel &&
      new PhoneNumber(
        dbModel.id,
        dbModel.phone_number,
        dbModel.update_at,
      )
    )
  }
}