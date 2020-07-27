import { PhoneDatabase } from "../data/PhoneDatabase";
import { IdManager } from "../services/IdManager";
import { PhoneNumber } from "../model/PhoneNumber";

export class PhoneBusiness {
  constructor(
    private phoneDatabase: PhoneDatabase,
    private idManager: IdManager
  ) { }
}
