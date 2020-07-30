import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { AmountBusiness } from "../business/AmountBusiness";
import { AmountDatabase } from "../data/AmountDatabase";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { HashManager } from "../services/HashManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { TokenManager } from "../services/TokenManager";
import { NotFoundError } from "../errors/NotFoundError";

export class AmountController {
  constructor(
    private tokenManager: TokenManager
  ) { }
  private static AmountBusiness = new AmountBusiness(
    new AmountDatabase(),
    new IdManager()
  )

  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new HashManager()
  )

  async insert(req: Request, res: Response) {
    try {
      const { amount, token } = req.body

      if (!amount || !token) {
        throw new InvalidParameterError("Preencha todos os campos")
      }
      if(isNaN(amount)){
        throw new InvalidParameterError("Valor solicitado inválido")
      }

      const userData = this.tokenManager.retrieveDataFromToken(token)

      const user = AmountController.UserBusiness.getUserById(userData.id)

      if (!user) {
        throw new NotFoundError("Usuário não encontrado")
      }

      await AmountController.AmountBusiness.insert(amount, userData.id)

      res.status(200).send({ message: "OK" })

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });

    } finally {
      await BaseDatabase.disconnectDB()
    }
  }
}