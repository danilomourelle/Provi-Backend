import { AddressDatabase } from "../data/AddressDatabase";
import { IdManager } from "../services/IdManager";
import { Address } from "../model/Address";

export class AddressBusiness {
  constructor(
    private addressDatabase: AddressDatabase,
    private idManager: IdManager
  ) { }
}
