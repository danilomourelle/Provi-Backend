import { BirthdayDatabase } from "../data/BirthdayDatabase";
import { IdManager } from "../services/IdManager";
import { Birthday } from "../model/Birthday";

export class BirthdayBusiness {
  constructor(
    private birthdayDatabase: BirthdayDatabase,
    private idManager: IdManager
  ) { }
}
