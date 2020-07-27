import { CPFDatabase } from "../data/CPFDatabase";
import { IdManager } from "../services/IdManager";
import { CPF } from "../model/CPF";

export class CPFBusiness {
  constructor(
    private cpfDatabase: CPFDatabase,
    private idManager: IdManager
  ) { }
}
