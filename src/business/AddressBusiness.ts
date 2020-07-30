import { AddressDatabase } from "../data/AddressDatabase";
import { IdManager } from "../services/IdManager";
import { Address } from "../model/Address";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";
import { TokenManager } from "../services/TokenManager";
import { CEPExternalAPI } from "../services/CEPExternalAPI";
import { InvalidParameterError } from "../errors/InvalidParameterError";

export class AddressBusiness {
  constructor(
    private addressDatabase: AddressDatabase,
    private idManager: IdManager,
    private cepExternaAPI: CEPExternalAPI
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

    const response = await this.cepExternaAPI.checkCEP(newAddress.getCEP())
    const streetParts = street.replace(/\s{2,}|\. |-/g, ' ').split(' ')
    let matches = 0
    for (const part of streetParts) {
      if (part && response.logradouro.includes(part)) {
        matches++
      }
    }

    if (matches < 2) {
      throw new InvalidParameterError("CEP e Logradouro não combinam")
    }

    const existingAddress = await this.addressDatabase.getAddressByValue(newAddress)


    if (existingAddress && existingAddress.getUserId() === userId) {
      await this.addressDatabase.update(Date.now(), existingAddress.getId());
    }
    else if (existingAddress && existingAddress.getUserId() !== userId) {
      throw new DataAlreadyInUser("Endereço utilizado em outro usuário")
    }
    else {
      await this.addressDatabase.create(newAddress)
    }
  }
}
