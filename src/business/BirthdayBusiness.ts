import { BirthdayDatabase } from "../data/BirthdayDatabase";
import { IdManager } from "../services/IdManager";
import { Birthday } from "../model/Birthday";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";

export class BirthdayBusiness {
  constructor(
    private birthdayDatabase: BirthdayDatabase,
    private idManager: IdManager
  ) { }

  public async insert(birthday: string, userId: string): Promise<void> {
    const id = this.idManager.generateId()

    const newBirthday = new Birthday(
      id,
      birthday,
      Date.now(),
      userId
    )

    const existingBirthday = await this.birthdayDatabase.getBirthdayByValue(newBirthday)


    if (existingBirthday && existingBirthday.getUserId() === userId) {
      await this.birthdayDatabase.update(Date.now(), existingBirthday.getId())
    }
    else if (existingBirthday && existingBirthday.getUserId() !== userId) {
      throw new DataAlreadyInUser("Endereço utilizado em outro usuário")
    }
    else {
      await this.birthdayDatabase.create(newBirthday)
    }
  }
}
