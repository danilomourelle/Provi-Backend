import { PhoneDatabase } from "../data/PhoneDatabase";
import { IdManager } from "../services/IdManager";
import { Phone } from "../model/Phone";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";

export class PhoneBusiness {
  constructor(
    private phoneDatabase: PhoneDatabase,
    private idManager: IdManager
  ) { }

  public async insert(phone: string, userId: string): Promise<void> {
    const id = this.idManager.generateId()

    const newPhone = new Phone(
      id,
      phone,
      Date.now(),
      userId
    )

    const existingPhone = await this.phoneDatabase.getPhoneByValue(newPhone)


    if (existingPhone && existingPhone.getUserId() === userId) {
      await this.phoneDatabase.update(Date.now(), existingPhone.getId())
    }
    else if (existingPhone && existingPhone.getUserId() !== userId) {
      throw new DataAlreadyInUser("Número utilizado em outro usuário")
    }
    else {
      await this.phoneDatabase.create(newPhone)
    }
  }
}
