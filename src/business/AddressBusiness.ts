import { AddressDatabase } from "../data/AddressDatabase";
import { IdManager } from "../services/IdManager";
import { Address } from "../model/Address";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";

export class AddressBusiness {
  constructor(
    private addressDatabase: AddressDatabase,
    private idManager: IdManager,
  ) { }

  public async insert(
    cep: string,
    street: string,
    number: number,
    complement: string,
    city: string,
    state: string,
    userId: string
  ): Promise<void> {
    const id = this.idManager.generateId()

    const newAddress = new Address(
      id,
      cep,
      street,
      number,
      complement,
      city,
      state,
      Date.now(),
      userId
    )

    const address = await this.addressDatabase.getAddressByValue(newAddress)


    if (address && address.getUserId() === userId) {
      await this.addressDatabase.update(Date.now(), address.getId())
    }
    else if (address && address.getUserId() !== userId) {
      throw new DataAlreadyInUser("Endereço utilizado em outro usuário")
    }
    else {
      await this.addressDatabase.create(newAddress)
    }
  }
}
