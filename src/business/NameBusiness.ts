import { NameDatabase } from "../data/NameDatabase";
import { IdManager } from "../services/IdManager";
import { Name } from "../model/Name";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";

export class NameBusiness {
  constructor(
    private nameDatabase: NameDatabase,
    private idManager: IdManager
  ) { }

  public async insert(name: string, userId: string): Promise<void> {
    const id = this.idManager.generateId()

    const nameArray = name.split(' ')
    if(nameArray.length < 2){
      throw new InvalidParameterError("Nome inválido")
    }
    const firstName = nameArray.shift()!
    const lastName = nameArray.join(' ')

    const newName = new Name(
      id,
      firstName,
      lastName,
      Date.now(),
      userId
    )

    const existingName = await this.nameDatabase.getNameByValue(newName)

    if (existingName && existingName.getUserId() === userId) {
      await this.nameDatabase.update(Date.now(), existingName.getId())
    }
    else if (existingName && existingName.getUserId() !== userId) {
      throw new DataAlreadyInUser("Nome utilizado em outro usuário")
    }
    else {
      await this.nameDatabase.create(newName)
    }
  }
}