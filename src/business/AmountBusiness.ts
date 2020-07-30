import { AmountDatabase } from "../data/AmountDatabase";
import { Amount } from "../model/Amount";
import { IdManager } from "../services/IdManager";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";

export class AmountBusiness {
  constructor(
    private amountDatabase: AmountDatabase,
    private idManager: IdManager
  ) { }

  public async insert(amount: string, userId: string): Promise<void> {
    const id = this.idManager.generateId()

    const newAmount = new Amount(
      id,
      amount,
      Date.now(),
      userId
    )

    const existingAmount = await this.amountDatabase.getAmountByValue(newAmount)


    if (existingAmount && existingAmount.getUserId() === userId) {
      await this.amountDatabase.update(Date.now(), existingAmount.getId())
    }
    else if (existingAmount && existingAmount.getUserId() !== userId) {
      throw new DataAlreadyInUser("Quantidade pedida em outro usuário")
    }
    else {
      await this.amountDatabase.create(newAmount)
    }
  }
}
