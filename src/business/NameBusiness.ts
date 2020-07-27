import { NameDatabase } from "../data/NameDatabase";
import { IdManager } from "../services/IdManager";
import { Name } from "../model/Name";

export class NameBusiness {
  constructor(
    private nameDatabase: NameDatabase,
    private idManager: IdManager
  ) { }
}