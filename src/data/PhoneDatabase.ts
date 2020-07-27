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
  
  public async getPhoneNumberByValue(value: string): Promise<PhoneNumber | undefined> {
    const result = await super.getConnection()
    .select("*")
    .from(PhoneDatabase.TABLE_NAME)
    .where({cep: value})
    .orWhere({street: value})
    .orWhere({number: Number(value)})
    .orWhere({complement: value})
    .orWhere({city: value})
    .orWhere({state: value})

    return this.toModel(result[0])
  }

  public async getPhoneNumberByUserId(id: string): Promise<PhoneNumber | undefined>{
    const result = await super.getConnection()
    .select("*")
    .from(PhoneDatabase.TABLE_NAME)
    .where({user_id: id})

    return this.toModel(result[0])
  }
}