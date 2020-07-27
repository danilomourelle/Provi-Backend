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

  public async create(user: User): Promise<void> {
    await this.getConnection()
      .insert({
        id: user.getId(),
        email: user.getEmail(),
        password: user.getHash(),
      })
      .into(ProductDatabase.TABLE_NAME)
  }

  public async getUserById(id: string): Promise<User | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(ProductDatabase.TABLE_NAME)
      .where({ id })

    return this.toModel(result[0])
  }
}