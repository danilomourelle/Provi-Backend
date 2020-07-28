import { BirthdayDatabase } from "../data/BirthdayDatabase";
import { IdManager } from "../services/IdManager";
import { Birthday } from "../model/Birthday";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";

export class BirthdayBusiness {
  constructor(
    private birthdayDatabase: BirthdayDatabase,
    private idManager: IdManager
  ) { }

  public async insert(inputBirthday: string, userId: string): Promise<void> {
    const id = this.idManager.generateId()

    const newBirthday = new Birthday(
      id,
      inputBirthday,
      Date.now(),
      userId
    )

    const birthday = await this.birthdayDatabase.getBirthdayByValue(newBirthday)


    if (birthday && birthday.getUserId() === userId) {
      await this.birthdayDatabase.update(Date.now(), birthday.getId())
    }
    else if (birthday && birthday.getUserId() !== userId) {
      throw new DataAlreadyInUser("Endereço utilizado em outro usuário")
    }
    else {
      await this.birthdayDatabase.create(newBirthday)
    }
  }
}
