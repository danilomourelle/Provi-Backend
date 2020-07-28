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
        dbModel.update_at,
        dbModel.user_id
      )
    )
  }

  public async create(name: Name): Promise<void> {
    await this.getConnection()
      .insert({
        id: name.getId(),
        first_name: name.getFirstName(),
        last_name: name.getLastName(),
        update_at: name.getUpdateAt(),
        user_id: name.getUserId()
      })
      .into(NameDatabase.TABLE_NAME)
  }

  public async update(newDate: number, nameId: string): Promise<void> {
    await this.getConnection()
      .update({
        update_at: newDate
      })
      .into(NameDatabase.TABLE_NAME)
      .where({id: nameId})
  }
  
  public async getNameByValue(name: Name): Promise<Name | undefined> {
    const result = await super.getConnection()
    .select("*")
    .from(NameDatabase.TABLE_NAME)
    .where({first_name: name.getFirstName()})
    .orWhere({last_name: name.getLastName()})

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