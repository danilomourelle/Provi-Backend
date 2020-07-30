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
        dbModel.user_id
      )
    )
  }

  public async create(birthday: Birthday): Promise<void> {
    await this.getConnection()
      .insert({
        id: birthday.getId(),
        birthday: birthday.getBirthday(),
        update_at: birthday.getUpdateAt(),
        user_id: birthday.getUserId()
      })
      .into(BirthdayDatabase.TABLE_NAME)
  }

  public async update(newDate: number, birthdayId: string): Promise<void> {
    await this.getConnection()
      .update({
        update_at: newDate
      })
      .into(BirthdayDatabase.TABLE_NAME)
      .where({ id: birthdayId })
  }

  public async getBirthdayByValue(birthday: Birthday): Promise<Birthday | undefined> {
    const result = await super.getConnection()
      .select("*")
      .from(BirthdayDatabase.TABLE_NAME)
      .where({ birthday: birthday.getBirthday() })

    return this.toModel(result[0])
  }

  public async getBirthdayByUserId(id: string): Promise<Birthday | undefined> {
    const result = await super.getConnection()
      .select("*")
      .from(BirthdayDatabase.TABLE_NAME)
      .where({ user_id: id })

    return this.toModel(result[0])
  }
}