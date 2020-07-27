import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { User } from "../model/User";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idManager: IdManager
  ) { }
}