import { AddressDatabase } from "../data/AddressDatabase";
import { IdManager } from "../services/IdManager";
import { Address } from "../model/Address";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";
import { CEPExternalAPI } from "../services/CEPExternalAPI";

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
    console.log(this)

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

    const response = await new CEPExternalAPI().checkCEP(newAddress.getCEP())


    console.log(response.)

    const existingAddress = await this.addressDatabase.getAddressByValue(newAddress)


    /*  if (existingAddress && existingAddress.getUserId() === userId) {
       await this.addressDatabase.update(Date.now(), existingAddress.getId())
     }
     else if (existingAddress && existingAddress.getUserId() !== userId) {
       throw new DataAlreadyInUser("Endereço utilizado em outro usuário")
     }
     else {
       await this.addressDatabase.create(newAddress)
     } */
  }
}
