import { BaseDatabase } from "./BaseDatabase";
import { Address } from "../model/Address";

export class AddressDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'Address'

  private toModel(dbModel?: any): Address | undefined {
    return (
      dbModel &&
      new Address(
        dbModel.id,
        dbModel.cep,
        dbModel.street,
        Number(dbModel.number),
        dbModel.complement,
        dbModel.city,
        dbModel.state,
        dbModel.update_at
      )
    )
  }
}